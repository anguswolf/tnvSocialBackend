import userNormalizer from '../../normalizer/userNormalizer.js';
import {updateUserPassword} from '../../service/userService.js'

export default async (req, res) => {
    const  registeredUser = await updateUserPassword(req)
    
    if (registeredUser) {
        res.status(200).json(userNormalizer(registeredUser))
    } else {
        res.status(404).json({ message: 'no user found' });
    }
} 