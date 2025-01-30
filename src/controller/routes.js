/**
 * VALIDATORS
 */
import createPostValidator from '../validator/post/createValidator.js'
import createUserValidator from '../validator/user/createValidator.js'
import loginValidator from '../validator/user/loginValidator.js'
import updatePasswordValidator from "../validator/user/updatePasswordValidator.js";
import createCommentValidator from "../validator/comment/createCommentValidator.js";

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
import toggleLikeController from "./post/toggleLikeController.js";
import addCommentController from "./comment/addCommentController.js";
import updateCommentController from "./comment/updateCommentController.js";
import removeCommentController from "./comment/removeCommentController.js";


const setup = (app) => {
    /* USER API */
    app.post('/user', createUserValidator, createUserController);
    app.get('/user/:id/confirm/:registrationToken', checkUserMailController);
    app.post('/user/resetPassword', updateTokenAndSendMailController);
    app.patch('/user/:id/updatePassword/', updatePasswordValidator, updateUserPasswordController);
    app.post('/user/login', loginValidator, loginController)

    /* POST API */
    app.post('/post',checkAuthorizationMiddleware, uploadFileToMongoMiddleware('image'), createPostValidator, addPostController);
    app.get('/post/:id', retrievePostController);
    app.get('/post/page/:pageId', listPostController);

    /* LIKE API */
    app.post('/post/:id/toggleLike',checkAuthorizationMiddleware, toggleLikeController);

    /* COMMENT API */
    app.post('/post/:id/comment/',checkAuthorizationMiddleware, createCommentValidator, addCommentController);
    /*app.patch('/post/:id/comment/:commentId/',checkAuthorizationMiddleware /!*updateActivityValidator*!/, updateCommentController); //TODO updateCommentValidator*/
    app.delete('/post/:id/comment/:commentId',checkAuthorizationMiddleware, removeCommentController);

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