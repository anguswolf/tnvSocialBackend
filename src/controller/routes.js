/**
 * VALIDATORS
 */
import createPostValidator from '../validator/post/createValidator.js'
import createUserValidator from '../validator/user/createValidator.js'
import loginValidator from '../validator/user/loginValidator.js'
import updatePasswordValidator from "../validator/user/updatePasswordValidator.js";

/**
 * POST CONTROLLERS
*/
import addPostController from './post/addPostController.js'
import retrievePostController from './post/retrievePostController.js'
import listPostController from './post/listPostController.js'
/**
 * USER CONTROLLERS
*/
import createUserController from './user/createUserController.js'
import checkUserMailController from './user/checkUserMailController.js'
import loginController from './user/loginController.js';
/**
 * MIDDLEWARES
 */
import checkAuthorizationMiddleware from '../middleware/checkAuthorizationMiddleware.js'
import {uploadFileToMongoMiddleware} from "../middleware/uploadFileToMongoMiddleware.js";

import updateTokenAndSendMailController from "./user/updateTokenAndSendMailController.js";
import updateUserPasswordController from "./user/updateUserPasswordController.js";


const setup = (app) => {

    app.post('/user' ,createUserValidator, createUserController);
    app.get('/user/:id/confirm/:registrationToken',checkUserMailController);
    app.post('/user/resetPassword' , updateTokenAndSendMailController);
    app.patch('/user/updatePassword/',updatePasswordValidator, updateUserPasswordController);
    app.post('/user/login', loginValidator, loginController)

    app.get('/post/page/:pageId', listPostController);
    app.get('/post/:id', retrievePostController);
    app.post('/post',checkAuthorizationMiddleware, uploadFileToMongoMiddleware('image'), createPostValidator, addPostController);

    //definire app.use dopo la route app.post, app.patch
    app.use((err, req, res, next) => {
        if (err && err.error && err.error.isJoi) {
            res.status(400).json({
                type: err.type,
                message: err.error.toString()
            })

        } else {
            next(err);
        }
    })
}

export default setup;