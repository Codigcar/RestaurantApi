const mongoose = require('mongoose')
const Schema = mongoose.Schema
// modelos
const Users = mongoose.model('User', new Schema({
    email: String,
    password: String,
    salt: String,
}))

module.exports = Users
