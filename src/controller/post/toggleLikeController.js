import {toggleLike} from '../../service/postService.js'

export default async (req,res) => {
    try {
        const data = {...req.body, userId: req.userId};

        const result = await toggleLike(data) // promise
        /*res.status(201).json(postNormalizer(result));*/
        res.status(201).json(result);
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(500).json({message: error.message})
    }
}


