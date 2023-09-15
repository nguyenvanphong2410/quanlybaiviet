const { Joi } = require("express-validation");
const { responseError, responseErrorDetail, responseValidateFailed } = require("../../utils/ResponseHandle");
const { Post } = require("../models/PostsModel");

const paramValidation = {
    createPost: {
        body: Joi.object({
            title: Joi.string().max(255).trim().required().messages({
                "string.base": "Tiêu đề bài post phải là một chuỗi văn bản",
                "string.max": "Tiêu đề bài post không được vượt quá {#limit} ký tự",
                "string.empty": "Tiêu đề bài post không được bỏ trống",
                "any.required": "Tiêu đề bài post không được bỏ",
            }),
            like: Joi.number().messages({
                "number.base": "Lượt thích phải là số",
            }),
            thumbnail: Joi.string().max(255).trim().required().messages({
                "string.base": "Link ảnh phải là một chuỗi văn bản",
                "string.max": "Link ảnh không được vượt quá {#limit} ký tự",
                "string.empty": "Link ảnh không được bỏ trống",
                "any.required": "Link ảnh không được bỏ",
            }),
            id : Joi.array()
        }),
    },


};


const validateCreatePost = async (req, res, next) => {
    try {
        const dataPost = req.body
        console.log("dataPost", dataPost)
        // console.log("dataPost.[ids]", dataPost.id);
        const posts = await Post.find({ deleted_at: null, });
        if (posts?.length > 0) {
            let error_details = {};
            for (let postsItem of posts) {
                if (postsItem.title === dataPost.title) {
                    error_details.title = "Tên bài đăng đã tồn tại";
                }
            }
            if (Object.keys(error_details).length > 0) {
                return responseValidateFailed(res, error_details);
            }
        }
        next()

    } catch (error) {

        return responseError(res, 500, "Server Error validateCreatePost")
    }
}



module.exports = {
    paramValidation,
    validateCreatePost,


}
