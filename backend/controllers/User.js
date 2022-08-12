const UserLibrary = require('../libraries/User')
const HTTPHandler = require('../libraries/HTTPHandler')
const LoggerLibrary = require('../libraries/Logger')
const user = new UserLibrary()
const http = new HTTPHandler()
const logger = new LoggerLibrary();
const bcrypt = require('bcrypt')

const login = (req, res) => {
    let email, password;
    email = req?.body?.email;
    password = req?.body?.password;

    if (typeof email !== 'string') {
        http.BadInput(res, "Email must be a string")
        return
    }

    if (typeof password !== 'string') {
        http.BadInput(res, 'Password must be a string')
        return
    }

    email = email.trim()

    if (email.length < 1) {
        http.BadInput(res, 'Email cannot be an empty string')
        return
    }

    if (password.trim().length < 8) {
        http.BadInput(res, 'Password must be longer than 8 characters')
        return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        http.BadInput(res, 'Email is invalid')
        return
    }

    const LoginResponse = user.login(email)

    if (LoginResponse === null) {
        http.BadInput(res, 'No account with this email found.')
        return
    }

    if (typeof LoginResponse === 'object' && LoginResponse.error) {
        http.ServerError(res, 'An error occured while finding user. Please try again later.')
        logger.error(LoginResponse.error)
        return
    }

    bcrypt.compare(password, LoginResponse.password).then(result => {
        if (result) {
            http.OK(res, 'Successfully logged in', {
                email: LoginResponse.email,
                name: LoginResponse.name
            })
        } else {
            http.BadInput(res, 'Wrong password.')
        }
    }).catch(error => {
        http.ServerError(res, 'An error occured while verifying password. Please try again later.')
        logger.error(error)
    })
}

const signup = async (req, res) => {
    let email, password, name;
    email = req?.body?.email;
    password = req?.body?.password;
    name = req?.body?.name;

    if (typeof email !== 'string') {
        http.BadInput(res, 'Email must be a string')
        return
    }

    if (typeof password !== 'string') {
        http.BadInput(res, 'Password must be a string')
        return
    }

    if (typeof name !== 'string') {
        http.BadInput(res, 'Name must be a string')
        return
    }

    email = email.trim();
    name = name.trim();

    if (email.length < 1) {
        http.BadInput(res, 'Email cannot be an empty string')
        return
    }

    if (password.length < 8) {
        http.BadInput(res, 'Password must be more than 8 characters long')
        return
    }

    if (name.length < 1) {
        http.BadInput('Name cannot be an empty string')
        return
    }

    if (name.length > 20) {
        http.BadInput(res, 'Name cannot be more than 20 characters long')
        return
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        http.BadInput(res, 'Email is invalid')
        return
    }

    if (!/^[a-zA-Z0-9]*$/.test(name)) {
        http.BadInput(res, 'Name can only contain letters and numbers')
        return
    }

    if (await user.findUserByEmail(email) !== null) {
        http.BadInput(res, 'User with that email already exists.')
        return
    }

    if (await user.findUserByName(name) !== null) {
        http.BadInput(res, 'User with that name already exists.')
        return
    }

    const hashedPassword = user.hashPassword(password);

    if (typeof hashedPassword === 'object' && hashedPassword !== null && hashedPassword.error) {
        http.ServerError(res, 'An error occured while creating your account. Please try again later.')
        logger.error(hashedPassword.error)
        return
    }

    const newUserObject = {
        name,
        password: hashedPassword,
        email: email,
        followers: [],
        following: []
    }

    const newUserResponse = user.createAccount(newUserObject)

    if (typeof newUserObject !== 'object' || !newUserObject) {
        http.ServerError(res, 'An error occured while creating your account. Please try again later.')
        logger.error('FOR SOME REASON NEW USER RESPONSE IS NOT AN OBJECT OR IS A FALSEY VALUE')
        return
    }

    if (newUserObject.error) {
        http.ServerError(res, 'An error occured while creating your account. Please try again later.')
        logger.error(newUserObject.error)
        return
    }

    http.OK(res, 'Successfully created an account.', newUserResponse)
}

module.exports = {
    login,
    signup
}