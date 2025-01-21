import ForbiddenException from '../exception/ForbiddenException.js';
import NotFoundException from '../exception/NotFoundException.js';
import { postModel } from '../schema/postSchema.js';
import {c} from "sinon/lib/sinon/spy-formatters.js";
import {userModel} from "../schema/userSchema.js";

const addPost = async (data) => {
  data.ownerId = data.userId;
  const result = await new postModel(data).save()
  return result.toJSON({versionKey: false})
}

const toggleLike = async (data) => {
  try {
    console.log(data)
    const postId = data.postId;
    const userId = data.userId;

    const post = await postModel.findById(postId);
    if (!post) {
      return { success: false, message: "Post not found" };
    }

    const hasLiked = post.likes.includes(userId);

    const operation = hasLiked
        ? {
            $pull: { likes: userId },
            $inc: { likesCount: -1 },
          }
        : {
          $addToSet: {likes: userId},
          $inc: {likesCount: 1},
          }

    const result = await postModel.updateOne(
        { _id: postId },
        operation);

    console.log(result)
    if (result.modifiedCount > 0) {
      return {
        success: true,
        message: hasLiked ? "Like removed successfully" : "Like added successfully",
      };
    } else {
      return {
        success: false,
        message: "Operation failed, no changes were made",
      };
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    return { success: false, error: error.message };
  }
}


const retrievePost = async (id) => {
  const res = await postModel
      .findById(id)
      .populate('ownerId', 'displayName displaySurname'); // Recupera i campi `name` e `email` dell'utente

  if (!res) {
    return null; // Nessun post trovato
  }
  return res.toJSON({ versionKey: false });
}

const listPosts = async (userId, pageId= 1) => {
  const pageSize = 3; // Numero di post per pagina
  const skip = (pageId - 1) * pageSize; // Calcola quanti documenti saltare
  let res;
  try {
    res = await postModel.find({})
        .populate('ownerId', 'displayName displaySurname')
        .skip(skip)
        .limit(pageSize)
        .exec();

  }catch(err) {
    console.log(err);
  }

  //console.log(res?.map(item => item.toJSON({versionKey:false})))
  //return post?.toJSON({versionKey:false}) || null
  return res?.map(item => item.toJSON({versionKey:false}));
}

/*const _changeStatus = async (id, userId, status) => {
  if(!(id && userId)){return null}
  const activity = await postModel.findOneAndUpdate({_id:id,ownerId:userId},{$set:{status}},{upsert:false,new:true})
  return activity?.toJSON({versionKey:false}) || null
}*/

export default {
  addPost,
  retrievePost,
  listPosts,
  toggleLike
}
