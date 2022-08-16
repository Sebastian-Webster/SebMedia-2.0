const TextPost = require('../models/TextPost')

class TextPostLibrary {
    findPostsByCreatorId = (creatorId, limit, skip) => {
        return new Promise((resolve, reject) => {
            TextPost.find({creatorId}).skip(skip).limit(limit).then(result => {
                resolve(result)
            }).catch(error => {
                reject(error)
            })
        })
    }
}

module.exports = TextPostLibrary;