const express = require('express')
const router = express.Router();
const { login, signup } = require('../controllers/User')

router.post('/login', (req, res) => {
    login(req, res)
})

router.post('/signup', (req, res) => {
    signup(req, res)
})

module.exports = router;