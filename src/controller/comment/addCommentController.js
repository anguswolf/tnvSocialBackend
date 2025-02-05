import {addComment} from "../../service/commentService.js";

export default async (req,res) => {
    try {
        const postId = req.params.id;
        const data = {...req.body, authorId: req.userId, postId: postId};
        const result = await addComment(data)
        res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(500).json({message: error.message})
    }
}


