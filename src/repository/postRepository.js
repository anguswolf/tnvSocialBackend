import { postModel } from '../schema/postSchema.js';
import {commentModel} from "../schema/commentSchema.js";
import {postConfig} from "../const/const.js";
import {likeModel} from "../schema/likeSchema.js";

const addPost = async (data) => {
  data.ownerId = data.userId;
  const result = await new postModel(data).save();
  const populatedPost = await postModel.findById(result._id).populate('ownerId', 'displayName displaySurname');

  return {
    post: {
      ...populatedPost.toJSON({ versionKey: false }),
      commentsCount: 0,
    },
    comments: [],
    likes: [],
  };
}

const retrievePost = async (id) => {
  try {
    const post = await postModel
        .findById(id)
        .populate('ownerId', 'displayName displaySurname avatar'); // Popola i dati dell'owner

    if (!post) {
      return { success: false, message: "Post non trovato" };
    }

    const comments = await commentModel
        .find({ postId: id })
        .populate('authorId', 'displayName displaySurname email avatar')
        .sort({ createdAt: -1 });

    const likes = await likeModel
        .find({postId: id})
        .populate('authorId', 'displayName displaySurname email')
        .sort({ createdAt: -1 });

    return { post, comments, likes};

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
        .populate('ownerId', 'displayName displaySurname avatar')
        .skip(skip) // Salta i post delle pagine precedenti
        .limit(pageSize) //
        .lean();

    if (!posts || posts.length === 0) {
      //return res.status(404).json({ success: false, message: "Nessun post trovato" });
      return { success: true, posts: [] };
    }

    const postsWithCommentsAndLikes = await Promise.all(posts.map(async (post) => {
        const comments = await commentModel
              .find({ postId: post._id })
              .populate('authorId', 'displayName displaySurname email avatar')
              .sort({ createdAt: -1 })
              .lean();

        const likes = await likeModel
              .find({ postId: post._id })
              .populate('authorId', 'displayName displaySurname email')
              .sort({ createdAt: -1 })
              .lean();

        return { post, comments, likes};
    }));

    return { posts: postsWithCommentsAndLikes };
    //return res.status(200).json({ success: true, posts: postsWithComments });

  } catch (error) {
    console.error("Errore in listPosts:", error);
    //return res.status(500).json({ success: false, message: "Errore interno", error: error.message });
    return { success: false, message: "Errore interno", error: error.message };
  }
};

export default {
  addPost,
  retrievePost,
  listPosts,
}
