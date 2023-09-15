const { Joi } = require("express-validation");
const { responseError, responseErrorDetail, responseValidateFailed } = require("../../utils/ResponseHandle");
const mongoose = require("mongoose");
const { Categories } = require("../models/CategoriesModel");
const { validateName } = require("../../helpers");

const paramValidation = {
    createCategory: {
        body: Joi.object({
            name: Joi.string().max(255).trim().custom(validateName).required().messages({
                "string.base": "Tên danh mục phải là một chuỗi văn bản",
                "string.max": "Tên danh mục không được vượt quá {#limit} ký tự",
                "string.empty": "Tên danh mục không được bỏ trống",
                "any.custom":"Tên danh mục không thể chứa số",
                "any.required": "Tên danh mục không được bỏ",
            }),
            description: Joi.string().max(1000).trim().required().messages({
                "string.base": "Mô tả phải là một chuỗi văn bản",
                "string.max": "Mô tả không được vượt quá {#limit} ký tự",
                "string.empty": "Mô tả không được bỏ trống",
                "any.required": "Mô tả không được bỏ",
            }),

        })
    },

};


const validateCreateCategory = async (req, res, next) => {
    try {
        const category = req.body
        console.log('category', category)
        const categories = await Categories.find({ deleted_at: null, });
        if (categories?.length > 0) {
            let error_details = {};
            for (let categoryItem of categories) {
                if (categoryItem.name === category.name) {
                    error_details.name = "Tên danh mục đã tồn tại";
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



module.exports = {
    paramValidation,
    validateCreateCategory,


}
