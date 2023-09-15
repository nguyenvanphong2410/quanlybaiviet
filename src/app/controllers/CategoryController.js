const { responseSuccess, responseError, responseValidateFailed } = require("../../utils/ResponseHandle");
const { logger } = require("../../configs/logger");
const { ObjectId } = require("mongodb");
const { Post } = require("../models/PostsModel");
const { createUserService, getAllUserService, updateUserService, deleteUserService, detailsUser } = require('../services/UserService');
const { param } = require("../../routes/user");
const { createCategoryService } = require("../services/CategoryService");

class CategoryController {

    // createUser
    createCategory = async (req, res) => {
        try {
            const dataCategory = req.body
            const newCategory = await createCategoryService(res, dataCategory);
            return responseSuccess(res, newCategory, 200)
        } catch (error) {
            console.log('Lỗi =>', error)
            return responseError(res, 500, "Server Error 1")
        }
    }

}

module.exports = new CategoryController();
