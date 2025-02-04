import {addPost} from '../../service/postService.js'
import postNormalizer from '../../normalizer/postNormalizer.js';

export default async (req,res) => {
    try {
        const data = {...req.body, userId: req.userId};

        if (req.file) {
            data.image = `/public/images/${req.file.filename}`;
        }

        const result = await addPost(data) // promise
        res.status(201).json(postNormalizer(result));

        /*res.status(201).json(result);*/
    } catch (error) {
        console.log(error.message + " - Response Status: " + error.status);
        res.status(500).json({message: error.message})
    }
}


