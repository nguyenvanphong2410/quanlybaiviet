const { logger } = require("../../configs/logger");
const { User } = require("../models/UsersModel");
const { ENTITY_TYPE } = require("../../configs/constants");
const mongoose = require("mongoose");
const _ = require("lodash");
const { UserBook } = require("../models/UserBookModel");
const { responseSuccess, responseError, responseValidateFailed } = require("../../utils/ResponseHandle");
const moment = require("moment");
const { Post } = require("../models/PostsModel");
const constants = require("../../configs/constants");


class UserService {

    // createUserService
    createUserService = async ({ user, userbook }) => {
        let newUser = new User(user);
        newUser = await newUser.save();
        let newBook = new UserBook({
            ...userbook,
            user_id: newUser._id
        })
        newBook = await newBook.save();
        return { newUser, newBook }
    }

    //getAllUserService
    getAllUserService = async (req) => {
        let { s, sort_by, sort_order, page, page_size, number_post, compare_post } = req.query;
        console.log('req.query => ', req.query)

        const sRegex = s?.trim() ? new RegExp(s.trim(), "i") : null;

        const pageNumber = page && parseInt(page) > 0 ? parseInt(page) : 1;
        const pageSize = page_size ? parseInt(page_size) : constants.PAGE_SIZE;

        const sortBy = sort_by ? sort_by : constants.SORT_BY;
        const sortOrder = sort_order === "asc" ? 1 : -1;
        const numberPost = parseInt(number_post) > 0 ? parseInt(number_post) : 0
        const comparePost = compare_post ? compare_post : ""

        const result = await User.aggregate([
            {
                $match: {
                    deleted_at: null,
                    ...(sRegex !== null ? { $or: [{ name: sRegex }, { email: sRegex }, { phone: sRegex }] } : null),
                },
            },
            {
                $lookup:
                {
                    from: 'posts',
                    localField: '_id',
                    foreignField: 'creator_id',
                    as: 'posts'
                }
            },

            //Lọc ra những bài viết
            {
                $addFields: {
                    posts: {
                        $filter: {
                            input: "$posts",
                            as: "item",
                            cond: {
                                $or: [
                                    { $eq: ["$$item.deleted_at", null] },
                                    { $eq: ["$$item.deleted_at", undefined] },
                                    { $not: ["$$item.deleted_at"] }
                                ]
                            }
                        }
                    },
                }
            },
            {
                $match: {
                    $expr: {
                        [comparePost]: [{ $size: "$posts" }, numberPost]
                    }
                }
            },
            { $sort: { [sortBy]: sortOrder } },
            {
                $facet: {
                    metadata: [{ $count: "total" }],
                    data: [
                        { $skip: (pageNumber - 1) * pageSize },
                        { $limit: pageSize },
                        {
                            $project: {
                                _id: 1,
                                name: 1,
                                email: 1,
                                phone: 1,
                                posts: 1,
                                created_at: 1,
                            },
                        },
                    ],
                },
            },
            {
                $project: {
                    total: {
                        $cond: {
                            if: { $gt: [{ $size: "$metadata" }, 0] },
                            then: { $arrayElemAt: ["$metadata.total", 0] },
                            else: 0,
                        },
                    },
                    data: 1,
                },
            },

        ]);

        return {
            total: result[0].total,
            page: pageNumber,
            page_size: pageSize,
            users: result[0].data,
        };
    }

    // detailsUser
    detailsUserService = async (res, idUser) => {
        try {
            const user = await User.findOne({ _id: idUser, deleted_at: null, })
            const userBook = await UserBook.findOne({ user_id: idUser, deleted_at: null, })
            const userPost = await Post.find({ creator_id: idUser, deleted_at: null })
            console.log('userPost', userPost);

            const userDetails = {
                name: user.name,
                email: user.email,
                phone: user.phone,
                book: userBook,
                post: userPost,
                created_at: user.created_at,
                updated_at: user.updated_at,
                deleted_at: user.deleted_at,
            }


            return userDetails;

        } catch (e) {
            console.log(e)
            return responseError(res, 500, 'Xóa user thất bại !!! ')
        }
    }

    // updateUserService
    updateUserService = async (res, idUser, data) => {
        try {
            const UserBookUpdate = await UserBook.findOne({ user_id: idUser, deleted_at: null, })

            console.log('idUserBook', UserBookUpdate);

            const newUpdateUser = await User.findByIdAndUpdate(idUser, data.user, { new: true });
            const newUpdateUserBook = await UserBook.findByIdAndUpdate(UserBookUpdate._id, data.userbook, { new: true });

            return { newUpdateUser, newUpdateUserBook }

        } catch (e) {
            console.log(e)
            return responseError(res, 500, 'Cập nhật user thất bại !!! ')
        }
    }
    // deleteUserService
    deleteUserService = async (res, idUser) => {
        try {
            const userDelete = await User.findOne({ _id: idUser, deleted_at: null, })
            const userBookDelete = await UserBook.findOne({ user_id: idUser, deleted_at: null, })

            const deleteUser = userDelete.deleted_at = moment();
            await userDelete.save()
            const deleteUserBook = userBookDelete.deleted_at = moment();
            await userBookDelete.save()

            return { userDelete, userBookDelete }

        } catch (e) {
            console.log(e)
            return responseError(res, 500, 'Xóa user thất bại !!! ')
        }
    }


}

module.exports = new UserService();
