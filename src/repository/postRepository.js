import { postModel } from '../schema/postSchema.js';
import {userModel} from "../schema/userSchema.js";
import {postConfig} from "../const/const.js";

const addPost = async (data) => {
  data.ownerId = data.userId;
  const result = await new postModel(data).save()
  return result.toJSON({versionKey: false})
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
  const pageSize = postConfig.postPerPage; // Numero di post per pagina
  const skip = (pageId - 1) * pageSize;
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
  return res?.map(item => item.toJSON({versionKey:false}));
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



const addComment = async (data) => {
  try {
    const { authorId, textComment, postId } = data;

    console.log(authorId, textComment, postId);
    const author = await userModel.findOne({_id: authorId})
    const authorName = (author.toJSON({versionKey:false})).displayName
    const authorSurname = (author.toJSON({versionKey:false})).displaySurname

    const result = await postModel.updateOne(
        { _id: postId },
        {
          $push: {
            comments: {
              authorId: authorId,
              authorName:  authorName, //TODO check
              authorSurname:  authorSurname, //TODO check
              textComment: textComment.trim(),
            },
          },
          $inc: {commentsCount: 1},
        }
    );
    console.log("Update Result:", result);

    // Controlla l'esito dell'operazione
    if (result.modifiedCount > 0) {
      return { success: true, message: "Comment added successfully" };
    } else {
      return { success: false, message: "Post not found or comment not added" };
    }
  } catch (error) {
    console.error("Error in addComment:", error);
    return { success: false, message: "Internal server error", error: error.message };
  }
};


export default {
  addPost,
  retrievePost,
  listPosts,
  toggleLike,
  addComment,
}
