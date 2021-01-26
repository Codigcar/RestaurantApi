const express = require('express')
const crypto = require('crypto')
const users = require('../models/Users')
const Users = require('../models/Users')
/* instalar para usar json Web Token
npm i -S jsonwebtoken */
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../auth')
const router = express.Router()

const signToken = (id) => {
    return jwt.sign({_id}, 'mi-secreto', {
        expiresIn: 60 * 60 * 24 * 365, // seg min h d
    })
}


router.post('/register', (req, res) => {
    /* res.send('im a register') */
    const { email, password } = req.body
    crypto.randomBytes(16, (err, salt) => {
        const newSalt = salt.toString('base64')
        crypto.pbkdf2(password, newSalt, 10000, 64, 'sha1', (err, key) => {
            const encryptedPassword = key.toString('base64')
            Users.findOne({ email }).exec()
                .then(user => {
                    if(user){
                        return res.send('usuario existente')
                    }
                    Users.create({
                        email,
                        password: encryptedPassword,
                        salt: newSalt,
                    }).then(()=> {
                        res.send('usuario creado con exito')
                    })
                })
        })
    })
})

router.post('/login', (req, res) => {
    res.send('im a login')
    const { email, password } = req.body /* esta info viene del body */
    Users.findOne({ email }).exec()
        .then(user => {
            if(!user){
                return res.send('usuario y/o contraseña incorrecto')
            }
            crypto.pbkdf2(password, user.salt, 10000, 64, 'sha1', (err, key) => {
                const encryptedPassword = key.toString('base64')
                if(user.password === encryptedPassword){
                    const token = signToken(user._id)/* signtoken -> firmatoken: encrypta el id */
                    return res.send({token})
                }
                return res.send('usuario y/o contraseña incorrecto')
            })
        })
})

router.get('/me', isAuthenticated, (req, res) => {
    res.send(req.user)
})

module.exports = router