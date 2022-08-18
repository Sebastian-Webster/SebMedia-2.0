const ImagePost = require('../models/ImagePost')

class ImagePostLibrary {
    findPostsByCreatorId = (creatorId, limit, skip, viewerId) => {
        return new Promise((resolve, reject) => {
            ImagePost.find({creatorId}).skip(skip).limit(limit).then(result => {
                const toResolve = result.map(item => {
                    const toReturn = {
                        ...item._doc,
                        liked: item.likes.includes(viewerId)
                    }
                    delete toReturn.likes
                    return toReturn
                })
                console.log(toResolve)
                resolve(toResolve)
            }).catch(error => {
                reject(error)
            })
        })
    }

    likePost = (postId, userPublicId) => {
        return new Promise((resolve, reject) => {
            ImagePost.findOneAndUpdate({_id: postId}, {$push: {likes: userPublicId}})
            .then(() => resolve())
            .catch(error => reject(error))
        })
    }

    unlikePost = (postId, userPublicId) => {
        return new Promise((resolve, reject) => {
            ImagePost.findOneAndUpdate({_id: postId}, {$pull: {likes: userPublicId}})
            .then(() => resolve())
            .catch(error => reject(error))
        })
    }

    findPostById = async (id) => {
        try {
            return await ImagePost.findOne({_id: id})
        } catch (error) {
            return {error}
        }
    }
}

module.exports = ImagePostLibrary;