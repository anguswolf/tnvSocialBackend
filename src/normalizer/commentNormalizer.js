const normalizeComment = (data) => {
      return {
        id: data._id,
        postId: data.postId,
        authorId: data.authorId,
        textComment: data.textComment,
        createdAt: data.createdAt,
    };
}

export default normalizeComment;

export const list = data => {
    console.log(data, Array.isArray(data));
    return data.comments.map(item => normalizeComment(item))
}