import {retrievePost} from '../../service/postService.js'
import postNormalizer from '../../normalizer/postNormalizer.js';

export default async (req, res) => {
    const  postId = req.params['id'];
    const post = await retrievePost(postId)
    if (post) {
        res.status(200).json(postNormalizer(post))
        /*res.status(200).json(post)*/
    } else {
        res.status(404).json({ message: 'no post found' });
    }
} 