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
                resolve(toResolve)
            }).catch(error => {
                reject(error)
            })
        })
    }

    likePost = (postId, userPublicId) => {
        //Coming soon
    }

    unlikePost = (postId, userPublicId) => {
        //Coming soon
    }
}

module.exports = ImagePostLibrary;