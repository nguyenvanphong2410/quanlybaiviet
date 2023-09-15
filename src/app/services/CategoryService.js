const { logger } = require("../../configs/logger");
const { User } = require("../models/UsersModel");
const { ENTITY_TYPE } = require("../../configs/constants");
const mongoose = require("mongoose");
const _ = require("lodash");
const { UserBook } = require("../models/UserBookModel");
const { responseSuccess, responseError, responseValidateFailed } = require("../../utils/ResponseHandle");
const moment = require("moment");
const { Categories } = require("../models/CategoriesModel");


class UserService {
    createCategoryService = async (res, dataCategory) => {
        try {
            let newCategory = new Categories(dataCategory);
            newCategory = await newCategory.save();

            return { newCategory };
        } catch (error) {
            console.log('lỗi', error);
            return responseError(res, 500, 'Server Error tạo mới danh mục thất bại !!! ')

        }
    }
}

module.exports = new UserService();
