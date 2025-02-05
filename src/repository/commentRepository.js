import {postModel} from "../schema/postSchema.js";
import {userModel} from "../schema/userSchema.js";
import {commentModel} from "../schema/commentSchema.js";
import mongoose from "mongoose";

const addComment = async (data) => {
    try {
        const { authorId, textComment, postId } = data;
        const postExists = await postModel.findById(postId);
        if (!postExists) {
            return { success: false, message: "Post not found" };
        }

        const author = await userModel.findOne({_id: authorId})
        if (!author) {
            return { success: false, message: "Author not found" };
        }

        const newComment = new commentModel({
            postId,
            authorId,
            textComment: textComment.trim(),
        });

        await newComment.save();
        await postModel.updateOne({ _id: postId }, { $inc: { commentsCount: 1 } });

        return { success: true, message: "Comment added successfully" };

    } catch (error) {
        console.error("Error in addComment:", error);
        return { success: false, message: "Internal server error", error: error.message };
    }
};

const updateComment = async (postId, commentId, params) => {

    if (!mongoose.Types.ObjectId.isValid(commentId)) {
        throw new Error(`commentId non valido: ${commentId}`);
    }
    if (!params || typeof params !== "object") {
        throw new Error("I parametri passati non sono validi");
    }

    const filteredParams = {};
    if (params?.textComment) {
        filteredParams.textComment = params.textComment;
    } else {
        throw new Error("'textComment' mancante nei params");
    }

    const res = await commentModel.findOneAndUpdate(
        { _id: commentId },
        { $set: filteredParams },
        { upsert: false, new: true }
    );

    if (res.modifiedCount === 0) {
        throw new Error(`Nessun commento aggiornato con _id: ${commentId}`);
    }

    return res.toJSON({ versionKey: false });
    //return { message: "Commento aggiornato con successo!" };
};


const removeComment = async (postId, commentId) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(postId) || !mongoose.Types.ObjectId.isValid(commentId)) {
            return { success: false, message: "ID non valido" };
        }

        const comment = await commentModel.findById(commentId);
        if (!comment) {
            return { success: false, message: "Comment not found" };
        }

        const deletedComment = await commentModel.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return { success: false, message: "Errore nell'eliminazione del commento, potrebbe non esistere più" };
        }

        await postModel.updateOne({ _id: postId }, { $inc: { commentsCount: -1 } });

        return {
            success: true,
            message: "Comment deleted",
            deletedComment // Restituisce il commento eliminato per evitare errori di accesso a `_id`
        };

    } catch (error) {
        console.error("Errore durante l'eliminazione del commento:", error);
        return { success: false, message: "Errore nell'eliminazione del commento", error };
    }
};

export default {
    addComment,
    updateComment,
    removeComment,
}

