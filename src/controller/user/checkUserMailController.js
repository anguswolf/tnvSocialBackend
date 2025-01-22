import userNormalizer from '../../normalizer/userNormalizer.js';
import {confirmRegistration} from '../../service/userService.js'

export default async (req, res) => {
    try {
        const  userId = req.params['id'];
        const  registrationToken = req.params['registrationToken'];
        const  registeredUser = await confirmRegistration(userId,registrationToken)

        if (registeredUser) {
            res.status(200).json(userNormalizer(registeredUser))
        } else {
            res.status(404).json({ message: 'no user found' });
        }
    }catch(err) {
        console.log(err)
        res.status(err.status).json({ message: err.message })
    }
} 