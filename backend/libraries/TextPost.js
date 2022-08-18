const TextPost = require('../models/TextPost')

class TextPostLibrary {
    findPostsByCreatorId = (creatorId, limit, skip, viewerId) => {
        return new Promise((resolve, reject) => {
            TextPost.find({creatorId}).skip(skip).limit(limit).then(result => {
                const toResolve = result.map(item => {
                    const toReturn = {
                        ...item._doc,
                        liked: item.likes.includes(viewerId)
                    }
                    delete toReturn.likes
                    return toReturn
                })
                resolve(toResolve)
            }).catch(error => {
                reject(error)
            })
        })
    }

    likePost = (postId, userPublicId) => {
        return new Promise((resolve, reject) => {
            TextPost.findOne({_id: postId}).then(postFound => {
                if (!postFound.likes.includes(userPublicId)) {
                    TextPost.findOneAndUpdate({_id: postId}, {$push: {likes: userPublicId}}).then(() => {
                        resolve()
                    }).catch(error => reject(error))
                } else reject('User with public id has already liked this post')
            }).catch(error => reject(error))
        })
    }

    unlikePost = (postId, userPublicId) => {
        return new Promise((resolve, reject) => {
            TextPost.findOneAndUpdate({_id: postId}, {$pull: {likes: userPublicId}})
            .then(() => resolve())
            .catch(error => reject(error))
        })
    }

    findPostById = async (id) => {
        try {
            return await TextPost.findOne({_id: id})
        } catch (error) {
            return {error}
        }
    }
}

module.exports = TextPostLibrary;