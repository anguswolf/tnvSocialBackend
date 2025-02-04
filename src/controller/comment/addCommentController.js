import postNormalizer from '../../normalizer/postNormalizer.js';
import {addComment} from "../../service/commentService.js";

export default async (req,res) => {
    try {
        /*console.log(req.body);*/
        const postId = req.params.id; // ID del post
        const data = {...req.body, authorId: req.userId, postId: postId};
        console.log(data);
        const result = await addComment(data) // promise
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(500).json({message: error.message})
    }
}


