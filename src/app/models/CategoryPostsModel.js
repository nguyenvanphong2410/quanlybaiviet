const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const CategoryPostSchema = new Schema(
    {
        category_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Categories'
        }],
        post_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post'
        }],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const CategoryPost = mongoose.model("CategoryPost", CategoryPostSchema, "category_posts");

module.exports = { CategoryPost };
