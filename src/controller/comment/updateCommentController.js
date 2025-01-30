import {updateComment} from "../../service/commentService.js";
import postNormalizer from "../../normalizer/postNormalizer.js";

export default async (req, res) => {
    try {
        const postId = req.params['id'];
        const commentId = req.params['commentId'];
        const comment = await updateComment(postId, commentId, req.body)
        res.status(200).json(postNormalizer(comment))    //TODO Comment Normalizer
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(error.status || 500).json({ message: error.message, code: error.code })
    }
}