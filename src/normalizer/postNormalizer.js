const normalizePost = (data) => {
    return {
    id: data.post._id,
    title: data.post.title,
    text: data.post.text,
    image: data.post.image,
    createdAt: data.post.createdAt,
    updatedAt: data.post.updatedAt,
    owner: {
      id: data.post.ownerId._id,
      name: data.post.ownerId.displayName,
      surname: data.post.ownerId.displaySurname,
    },
    likes: {
      count: data.post.likesCount,
      list: data.likes.map(like => ({
          id: like._id,
          /*postId: like.postId,*/
          authorId: like.authorId._id,
          }))
      },
    comments: {
      count: data.post.commentsCount,
      list: data.comments.map(comment => ({
            id: comment._id,
            author: {
            id: comment.authorId._id,
            name: comment.authorId.displayName,
            surname: comment.authorId.displaySurname,
            },
            text: comment.textComment,
            createdAt: comment.createdAt,
        })),
      },
    };
};

export default normalizePost;

export const list = data => {
 /* console.log(data, Array.isArray(data));*/
  return data.posts.map(item => normalizePost(item))
}


