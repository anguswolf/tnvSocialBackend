import postRepo from '../repository/postRepository.js'
import commentRepo from "../repository/commentRepository.js";

const addComment = async (data) => {
		const content = data
		return await commentRepo.addComment(content)
}

const updateComment = async (postId, commentId, params) => {
	return await commentRepo.updateComment(postId, commentId, params)
}

const removeComment = async (postId, commentId) => {
	return commentRepo.removeComment(postId, commentId)
}

export {
 	addComment,
	updateComment,
	removeComment,
}
