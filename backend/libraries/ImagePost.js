const ImagePost = require('../models/ImagePost')

class ImagePostLibrary {
    findPostsByCreatorId = (creatorId, limit, skip) => {
        return new Promise((resolve, reject) => {
            ImagePost.find({creatorId}).skip(skip).limit(limit).then(result => {
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

module.exports = ImagePostLibrary;