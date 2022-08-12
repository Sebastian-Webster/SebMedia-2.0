const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const TextPostSchema = new Schema({
    creatorId: mongoose.Schema.Types.ObjectId,
    title: String,
    body: String
})

const TextPost = mongoose.model('TextPost', TextPostSchema)

module.exports = TextPost;