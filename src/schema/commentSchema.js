import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
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
    textComment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
export const commentModel =mongoose.model('comments', commentSchema);
