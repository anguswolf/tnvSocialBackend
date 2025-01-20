import userNormalizer from '../../normalizer/userNormalizer.js';
import {updateTokenAndSendMail} from "../../service/userService.js";

export default async (req,res) => {
    try {
        const user = await updateTokenAndSendMail(req.body)
        res.status(201).json(userNormalizer(user));
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error.message})
    }
}


