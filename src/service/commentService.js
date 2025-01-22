import postRepo from '../repository/postRepository.js'

const addComment = async (data) => {
		const content = data
		return await postRepo.addComment(content)
}

export {
 	addComment,

}
