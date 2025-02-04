import { postModel } from '../schema/postSchema.js';
import {commentModel} from "../schema/commentSchema.js";
import {postConfig} from "../const/const.js";


const addPost = async (data) => {
  data.ownerId = data.userId;
  const result = await new postModel(data).save();
  const populatedPost = await postModel.findById(result._id).populate('ownerId', 'displayName displaySurname');
  return populatedPost.toJSON({ versionKey: false });
}

/*const retrievePost = async (id) => {
  const res = await postModel
      .findById(id)
      .populate('ownerId', 'displayName displaySurname'); // Recupera i campi `name` e `email` dell'utente

  if (!res) {
    return null; // Nessun post trovato
  }
  return res.toJSON({ versionKey: false });
}*/

const retrievePost = async (id) => {
  try {
    const post = await postModel
        .findById(id)
        .populate('ownerId', 'displayName displaySurname'); // Popola i dati dell'owner

    if (!post) {
      return { success: false, message: "Post non trovato" };
    }

    const comments = await commentModel
        .find({ postId: id })
        .populate('authorId', 'displayName displaySurname email')
        .sort({ createdAt: -1 });

    //return { success: true, res, comments };
    console.log("----------------------------- 1 Post with comments: " + {post, comments });
    return { post, comments };

  } catch (error) {
    console.error("Errore in retrievePost:", error);
    return { success: false, message: "Errore interno", error: error.message };
  }
};

const listPosts = async (userId, pageId) => {
  const pageSize = postConfig.postPerPage; // Numero di post per pagina
  const skip = (pageId - 1) * pageSize;
  try {
    const posts = await postModel
        .find()
        .populate('ownerId', 'displayName displaySurname')
        .skip(skip) // Salta i post delle pagine precedenti
        .limit(pageSize) //
        .lean();

    if (!posts || posts.length === 0) {
      //return res.status(404).json({ success: false, message: "Nessun post trovato" });
      return { success: true, posts: [] };
    }

    const postsWithComments = await Promise.all(posts.map(async (post) => {
      const comments = await commentModel
          .find({ postId: post._id })
          .populate('authorId', 'displayName displaySurname email')
          .sort({ createdAt: -1 })
          .lean();

      return { post, comments };
    }));
    console.log("-----------------------------PostS with comments: " + postsWithComments);
    return { posts: postsWithComments };
    //return res.status(200).json({ success: true, posts: postsWithComments });

  } catch (error) {
    console.error("Errore in listPosts:", error);
    //return res.status(500).json({ success: false, message: "Errore interno", error: error.message });
    return { success: false, message: "Errore interno", error: error.message };
  }
};

/*const listPosts = async (userId, pageId= 1) => {
  const pageSize = postConfig.postPerPage; // Numero di post per pagina
  const skip = (pageId - 1) * pageSize;
  let res;
  try {
    const posts = await postModel.find({})
        .populate('ownerId', 'displayName displaySurname')
        .skip(skip)
        .limit(pageSize)
        .exec();

    // Recupera tutti i commenti associati a questo post e popola i dettagli dell'autore
    const comments = await commentModel
        .find({}) // Filtra solo i commenti di questo post
        .populate('authorId', 'displayName displaySurname email')
        .skip(skip)
        // Popola i dettagli dell'autore
        .sort({ createdAt: -1 }); // Ordina i commenti dal più recente al più vecchio
  }catch(err) {
    console.log(err);
  }
  console.log("listPosts: res" + res);
  return res?.map(item => item.toJSON({versionKey:false}));
}*/

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




export default {
  addPost,
  retrievePost,
  listPosts,
  toggleLike,
}
