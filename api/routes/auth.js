const express = require('express')
const users = require('../models/Users')

const router = express.Router()

router.post('/register', (req, res) => {
    res.send('im a register')
})

router.post('/login', (req, res) => {
    res.send('im a login')
})

module.exports = router