import likeRepo from "../repository/likeRepository.js";


const toggleLike = async (data) => {
    const content = data
    return await likeRepo.toggleLike(content)
}

export {
    toggleLike,
}