const { Joi } = require("express-validation");
const { User } = require("../models/UsersModel");
const { ENTITY_TYPE } = require("../../configs/constants/index");
const { responseError, responseErrorDetail, responseValidateFailed } = require("../../utils/ResponseHandle");
const { validateName } = require("../../helpers");
const mongoose = require("mongoose");
const { REGEX_VALIDATE_PHONE } = require("../../configs/constants/index");
const { UserBook } = require("../models/UserBookModel");

const paramValidation = {
    createUser: {
        body: Joi.object({
            user: Joi.object({
                name: Joi.string().max(255).trim().custom(validateName).required().messages({
                    "string.base": "Họ và tên phải là một chuỗi văn bản",
                    "string.max": "Họ và tên không được vượt quá {#limit} ký tự",
                    "string.empty": "Họ và tên không được bỏ trống",
                    "any.custom":"Họ và tên không thể chứa số",
                    "any.required": "Họ và tên không được bỏ",
                }),
                email: Joi.string().required().trim().lowercase().email().max(255).messages({
                    'string.base': 'Email phải là một chuỗi kí tự',
                    'any.required': 'Email không được bỏ trống',
                    'string.empty': 'Email không được bỏ trống',
                    'string.email': 'Email sai định dạng',
                    'string.max': 'Email không được quá {#limit} ký tự',
                }),
                phone: Joi.string().allow("").pattern(REGEX_VALIDATE_PHONE).required().messages({
                    "string.base": "Số điện thoại phải là một chuỗi văn bản",
                    "string.max": "Số điện thoại không được vượt quá {#limit} ký tự",
                    "string.pattern.base": "Số điện thoại không đúng định dạng",
                    "any.required": "Số điện thoại không hợp lệ",
                }),
            }),
            userbook: Joi.object({
                name: Joi.string().max(255).trim().custom(validateName).required().messages({
                    "string.base": "Tên sách phải là một chuỗi văn bản",
                    "string.max": "Tên sách không được vượt quá {#limit} ký tự",
                    "string.empty": "Tên sách không được bỏ trống",
                    "any.custom":"Tên sách không thể chứa số",
                    "any.required": "Tên sách không được bỏ trống",
                }),
                author: Joi.string().required().trim().custom(validateName).max(255).messages({
                    'string.base': 'Tên tác giả phải là một chuỗi kí tự',
                    'any.required': 'Tên tác giả không được bỏ trống',
                    'string.empty': 'Tên tác giả không được bỏ trống',
                    "any.custom":"Tên tác giả không thể chứa số",
                    'string.email': 'Tên tác giả sai định dạng',
                    'string.max': 'Tên tác giả không được quá 255 ký tự',
                }),
                price: Joi.number().required().messages({
                    "number.base": "Giá phải là một số",
                    'any.required': 'Giá không được bỏ trống',
                    'number.empty': 'Giá không được bỏ trống',
                    // "string.max": "Giá không được vượt quá {#limit} ký tự",
                }),
            }),
        })
    },

    updateUser: {
        params: Joi.object({
            id: Joi.string().required(),
        }),
        body: Joi.object({
            user: Joi.object({
                name: Joi.string().max(255).trim().required().messages({
                    "string.base": "Họ và tên phải là một chuỗi văn bản",
                    "string.max": "Họ và tên không được vượt quá {#limit} ký tự",
                    "string.empty": "Họ và tên không được bỏ trống",
                    "any.required": "Họ và tên không được bỏ",
                }),
                email: Joi.string().required().trim().lowercase().email().max(255).messages({
                    'string.base': 'Email phải là một chuỗi kí tự',
                    'any.required': 'Email không được bỏ trống',
                    'string.empty': 'Email không được bỏ trống',
                    'string.email': 'Email sai định dạng',
                    'string.max': 'Email không được quá {#limit} ký tự',
                }),
                phone: Joi.string().allow("").pattern(REGEX_VALIDATE_PHONE).required().messages({
                    "string.base": "Số điện thoại phải là một chuỗi văn bản",
                    "string.max": "Số điện thoại không được vượt quá {#limit} ký tự",
                    "string.pattern.base": "Số điện thoại không đúng định dạng",
                    "any.required": "Số điện thoại không hợp lệ",
                }),
            }),
            userbook: Joi.object({
                name: Joi.string().max(255).trim().required().messages({
                    "string.base": "Tên sách phải là một chuỗi văn bản",
                    "string.max": "Tên sách không được vượt quá {#limit} ký tự",
                    "string.empty": "Tên sách không được bỏ trống",
                    "any.required": "Tên sách không được bỏ trống",
                }),
                author: Joi.string().required().trim().max(255).messages({
                    'string.base': 'Author phải là một chuỗi kí tự',
                    'any.required': 'Author không được bỏ trống',
                    'string.empty': 'Author không được bỏ trống',
                    'string.email': 'Author sai định dạng',
                    'string.max': 'Author không được quá 255 ký tự',
                }),
                price: Joi.number().required().messages({
                    "number.base": "Giá phải là một số",
                    'any.required': 'Giá không được bỏ trống',
                    'number.empty': 'Giá không được bỏ trống',
                    // "string.max": "Giá không được vượt quá {#limit} ký tự",
                }),
            }),

        }),
    },
    deleteUser: {
        params: Joi.object({
            id: Joi.string().required(),
        }),
    },
    detailsUser: {
        params: Joi.object({
            id: Joi.string().required(),
        }),
    },
};


const validateCreateUser = async (req, res, next) => {
    try {
        const user = req.body.user
        const users = await User.find({ deleted_at: null, });
        if (users?.length > 0) {
            let error_details = {};
            for (let userItem of users) {
                if (userItem.email === user.email) {
                    error_details.email = "Email đã tồn tại";
                }
                if (user.phone && userItem.phone === user.phone) {
                    error_details.phone = "Số điện thoại đã tồn tại";
                }
            }
            if (Object.keys(error_details).length > 0) {
                return responseValidateFailed(res, error_details);
            }
        }
        next()

    } catch (error) {

        return responseError(res, 500, "Server Error 2")
    }
}

const validateUpdateUser = async (req, res, next) => {
    try {
        const user = req.body.user
        console.log('req.body update', user)
        const users = await User.find({ deleted_at: null, });
        if (users?.length > 0) {
            let error_details = {};
            for (let userItem of users) {
                if (userItem.email === user.email) {
                    error_details.email = "Email đã tồn tại";
                }
                if (user.phone && userItem.phone === user.phone) {
                    error_details.phone = "Số điện thoại đã tồn tại";
                }
            }
            if (Object.keys(error_details).length > 0) {
                return responseValidateFailed(res, error_details);
            }
            if (Object.keys(error_details).length > 0) {
                return responseValidateFailed(res, error_details);
            }
        }
        next()

    } catch (error) {
        console.log('err', error)
        return responseError(res, 500, "Server Error 4")
    }
}

const validateDeleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id; // Sử dụng req.params.id để lấy id từ yêu cầu
        if (!userId) {
            return responseError(res, 400, 'Server Error Không tìm thấy user này !')
        }
        const userDelete = await User.findOne({ _id: userId })
        const userBookDelete = await UserBook.findOne({ user_id: userId})

        if (userDelete.deleted_at !== null) {
            return responseError(res, 400, "User này đã bị xóa rồi")
        }
        if (userBookDelete.deleted_at !== null) {
            return responseError(res, 400, "UserBook này đã bị xóa rồi")
        }
        next()

    } catch (error) {
        console.log('err', error)
        return responseError(res, 500, "Server Error 5")
    }
}

const validateDetailsUser = async (req, res, next) => {
    try {
        const userId = req.params.id; // Sử dụng req.params.id để lấy id từ yêu cầu
        if (!userId) {
            return responseError(res, 400, 'Không tìm thấy user này !')
        }
        const userDelete = await User.findOne({ _id: userId })
        const userBookDelete = await UserBook.findOne({ user_id: userId})

        if (userDelete.deleted_at !== null) {
            return responseError(res, 400, "User này đã bị xóa rồi")
        }
        if (userBookDelete.deleted_at !== null) {
            return responseError(res, 400, "UserBook này đã bị xóa rồi")
        }
        next()

    } catch (error) {
        console.log('err', error)
        return responseError(res, 500, "Server Error 7")
    }
}

module.exports = {
    paramValidation,
    validateCreateUser,
    validateUpdateUser,
    validateDeleteUser,
    validateDetailsUser

}
