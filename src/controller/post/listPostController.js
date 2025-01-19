import {listPosts} from '../../service/postService.js'
import postNormalizer,{list} from '../../normalizer/postNormalizer.js';

export default async (req, res) => {
    const  pageId = req.params['pageId'];
    console.log(req.params);


    try {
        const listUserPosts = await listPosts(req.userId,pageId);
        res.status(200).json(list(listUserPosts))
        
    } catch (error) {
        console.log(error)
    }
} 