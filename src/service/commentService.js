import postRepo from '../repository/postRepository.js'

const addComment = async (data) => {
		const content = data
		return await postRepo.addComment(content)
}

const updateComment = async (postId, commentId, params) => {
	return await postRepo.updateComment(postId, commentId, params)
}

const removeComment = async (postId, commentId) => {
	return postRepo.removeComment(postId, commentId)
}

export {
 	addComment,
	updateComment,
	removeComment,
}
