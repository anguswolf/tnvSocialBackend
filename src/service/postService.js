import postRepo from '../repository/postRepository.js'

const retrievePost = async (id) => {
	return await postRepo.retrievePost(id)
  }

const listPosts = async (userId, pageId) => {
	return await postRepo.listPosts(userId, pageId);
}

const addPost = async (data) => {
		const content = data
		return await postRepo.addPost(content)
}

export {
 	retrievePost,
	addPost,
	listPosts,
/*	toggleLike,*/
}
