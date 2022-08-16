const User = require('../models/User')
const TextPost = require('../models/TextPost');
const bcrypt = require('bcrypt')

class UserLibrary {
    login = async (email) => {
        try {
            return await User.findOne({email})
        } catch (error) {
            return {error}
        } 
    }

    hashPassword = async (password) => {
        const saltRounds = 16;

        try {
            return await bcrypt.hash(password, saltRounds)
        } catch (error) {
            return {error}
        }
    }

    createAccount = async (accountObj) => {
        const newUser = new User(accountObj)

        try {
            return newUser.save()
        } catch (error) {
            return {error}
        }
    }

    findUserByEmail = async (email) => {
        try {
            return await User.findOne({email})
        } catch (error) {
            return {error}
        }
    }

    findUserByName = async (name) => {
        try {
            return await User.findOne({name})
        } catch (error) {
            return {error}
        }
    }

    uploadTextPost = (postObj) => {
        const newTextPost = new TextPost(postObj)

        return new Promise((resolve, reject) => {
            newTextPost.save()
            .then(result => resolve(result))
            .catch(error => reject(error))
        })
    }
}

module.exports = UserLibrary