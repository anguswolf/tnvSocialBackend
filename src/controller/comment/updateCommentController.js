import {updateComment} from "../../service/commentService.js";
import normalizeComment from "../../normalizer/commentNormalizer.js";


export default async (req, res) => {
    try {
        const postId = req.params['id'];
        const commentId = req.params['commentId'];

        const comment = await updateComment(postId, commentId, req.body)
        res.status(200).json(normalizeComment(comment))
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(error.status || 500).json({ message: error.message, code: error.code })
    }
}