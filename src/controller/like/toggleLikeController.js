import {toggleLike} from "../../service/likeService.js";

export default async (req,res) => {
    try {
        const postId = req.params.id; // ID del post
        const data = {...req.body, userId: req.userId, postId: postId};
        const result = await toggleLike(data) // promise
        res.status(201).json(result);
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(500).json({message: error.message})
    }
}


