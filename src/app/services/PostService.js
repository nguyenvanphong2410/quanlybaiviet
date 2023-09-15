const { logger } = require("../../configs/logger");
const { ENTITY_TYPE } = require("../../configs/constants");
const mongoose = require("mongoose");
const _ = require("lodash");
const { responseSuccess, responseError, responseValidateFailed } = require("../../utils/ResponseHandle");
const moment = require("moment");
const { Post } = require("../models/PostsModel");
const { CategoryPost } = require("../models/categoryPostsModel");

class PostService {

    // createPostService
    createPostService = async (res, userId, dataPost) => {
        const {title, like, thumbnail, id} = dataPost
        try {
            let newPost = new Post({
                title,
                like,
                thumbnail,
                creator_id: userId
            })
            newPost = await newPost.save();

            console.log('newPost', newPost)
            let newCategoryPost = new CategoryPost({
                category_id: id,
                post_id: newPost._id
            })
            newCategoryPost = await newCategoryPost.save();

            return {newPost, newCategoryPost};
            
        } catch (error) {
            console.log('Lỗi Error tạo mới bài đăng!', error);
            return responseError(res, 500, 'Server Error tạo mới bài đăng thất bại!');
        }
    }
}

module.exports = new PostService();
