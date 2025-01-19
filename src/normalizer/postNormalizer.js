const get = (post) => {
  const out = {
    _id: post._id,
    text: post.text,
    title: post.title,
    image: post.image,
    createdAt: post.createdAt,
    ownerId: post.ownerId,
    ownerName: post.ownerName,
  }
  return out
}

export default get;

export const list = posts => {
  console.log(posts);
  return posts.map(item => get(item))
}