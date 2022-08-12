const User = require('../models/User')
const bcrypt = require('bcrypt')

class UserLibrary {
    #log(log) {
        console.log(log)
    }

    login = async (email) => {
        try {
            return await User.findOne({email})
        } catch (error) {
            return {error}
        } 
    }

    hashPassword(password) {
        const saltRounds = 12;
        let hashedPassword;

        bcrypt.hash(password, saltRounds).then(hash => {
            hashedPassword = hash;
        }).catch(error => {
            hashedPassword = {
                error
            }
        })

        return hashedPassword;
    }

    createAccount(accountObj) {
        const newUser = new User(accountObj)

        let result;

        newUser.save().then(result => {
            result = result;
        }).catch((error) => {
            result = {error}
        })

        return result;
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
}

module.exports = UserLibrary