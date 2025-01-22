import userNormalizer from '../../normalizer/userNormalizer.js';
import {updateUserPassword} from '../../service/userService.js'

export default async (req, res) => {
    try {
        const userId = req.params['id'];
        const content = {...req.body,userId}
        const registeredUser = await updateUserPassword(content)

        if (registeredUser) {
            res.status(200).json(userNormalizer(registeredUser))
        } else {
            res.status(404).json({ message: 'no user found' });
        }
    } catch(err) {
        console.log(err)
        res.status(err.status).json({ message: err.message })
    }


}