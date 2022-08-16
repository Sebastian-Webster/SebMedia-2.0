const express = require('express')
const router = express.Router();
const { login, signup, uploadTextPost, getTextPostsByUserName } = require('../controllers/User')

router.post('/login', (req, res) => {
    login(req, res)
})

router.post('/signup', (req, res) => {
    signup(req, res)
})

router.post('/textPost', (req, res) => {
    uploadTextPost(req, res)
})

router.get('/textPostsByUserName', (req, res) => {
    getTextPostsByUserName(req, res)
})

router.post('/imagePost', (req, res) => {
    
})

module.exports = router;