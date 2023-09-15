const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const PostSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        like: {
            type: Number,
            required: true,
        },
        thumbnail: {
            type: String,
            required: false,
        },
        creator_id: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

const Post = mongoose.model("Post", PostSchema, "posts");

module.exports = { Post };
