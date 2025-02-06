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
 * COMMENT CONTROLLERS
 */
import addCommentController from "./comment/addCommentController.js";
import updateCommentController from "./comment/updateCommentController.js";
import removeCommentController from "./comment/removeCommentController.js";
/**
 * USER CONTROLLERS
*/
import createUserController from './user/createUserController.js'
import checkUserMailController from './user/checkUserMailController.js'
import loginController from './user/loginController.js';
import updateUserPasswordController from "./user/updateUserPasswordController.js";
/**
 * LIKE CONTROLLERS
 */
import toggleLikeController from "./like/toggleLikeController.js";
/**
 * MIDDLEWARES
 */
import checkAuthorizationMiddleware from '../middleware/checkAuthorizationMiddleware.js'
import updateTokenAndSendMailController from "./user/updateTokenAndSendMailController.js";
import uploadFileToServer from "../middleware/uploadFileToServer.js"; //TODO Check Dimension file image


const setup = (app) => {
    /* USER API */
    app.post('/user', createUserValidator, createUserController);
    app.get('/user/:id/confirm/:registrationToken', checkUserMailController);
    app.post('/user/resetPassword', updateTokenAndSendMailController);
    app.patch('/user/:id/updatePassword/', updatePasswordValidator, updateUserPasswordController);
    app.post('/user/login', loginValidator, loginController)

    /* POST API */
    app.post('/post',checkAuthorizationMiddleware, uploadFileToServer.single('image'), createPostValidator, addPostController);//TODO Check Dimension file image
    app.get('/post/:id', retrievePostController);
    app.get('/post/page/:pageId', listPostController);

    /* LIKE API */
    app.put('/post/:id/toggleLike',checkAuthorizationMiddleware, toggleLikeController);

    /* COMMENT API */
    app.post('/post/:id/comment/',checkAuthorizationMiddleware, createCommentValidator, addCommentController);
    app.patch('/post/:id/comment/:commentId/',checkAuthorizationMiddleware, createCommentValidator, updateCommentController); //TODO post/:id superfluo ?
    app.delete('/post/:id/comment/:commentId',checkAuthorizationMiddleware, removeCommentController);

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