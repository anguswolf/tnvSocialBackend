import {Schema} from "mongoose";
import mongoose from "mongoose";

const likeSchema = new Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true,
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    },
    {
    timestamps: {
        createdAt: 'createdAt',
        writeConcern: {w: 1, wtimeout: 2000},
        }
    }
)

export const likeModel = mongoose.model('likes', likeSchema);