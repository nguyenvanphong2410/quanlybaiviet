const { responseSuccess, responseError, responseValidateFailed } = require("../../utils/ResponseHandle");
const { logger } = require("../../configs/logger");
const { ObjectId } = require("mongodb");
const { Post } = require("../models/PostsModel");
const { param } = require("../../routes/user");
const { createPostService } = require("../services/PostService");

class UserController {

    // createUser
    createPost = async (req, res) => {
        try {
            const dataPost = req.body
            const userId = req.params.id
            console.log("dataPost2",dataPost)
            console.log('userId', userId)
            const newPost = await createPostService(res, userId, dataPost);
            return responseSuccess(res, newPost, 200)
        } catch (error) {
            console.log('Lỗi Error createPost =>', error)
            return responseError(res, 500, "Server Error createPost")
        }
    }

}

module.exports = new UserController();
