import { likeModel } from "../schema/likeSchema.js";
import { postModel } from "../schema/postSchema.js";

const toggleLike = async (data) => {
    try {
        const { postId, userId } = data;
        const existingLike = await likeModel.findOne({ postId, authorId: userId });

        if (existingLike) {
            await likeModel.deleteOne({ _id: existingLike._id });
            await postModel.updateOne({ _id: postId }, { $inc: { likesCount: -1 } });
            return { success: true, message: "Like removed successfully" };
        } else {
            await likeModel.create({ postId, authorId: userId });
            await postModel.updateOne({ _id: postId }, { $inc: { likesCount: 1 } });
            return { success: true, message: "Like added successfully" };
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        return { success: false, error: error.message };
    }
};

export default {
    toggleLike,
};
