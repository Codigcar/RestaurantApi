/* module.exports = (req, res) => {
    res.send('Hola Mundo123')
} */
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// routes
const meals = require('./routes/meals')
const orders = require('./routes/orders')

// auth
const auth = require('./routes/auth')

// creando app express
const app = express() // devuelve un obj con distintos métodos para crear la app
app.use(bodyParser.json()) // metodo para agregar plugins para agregar funcionalidades al servidor
app.use(cors()) 

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true}) // para conectar a la BD
// process.env : permite acceder a las variables de entorno -> variable de entorno llamado MONGO_URI
// 

/* app.get("*", (req, res) => {
    res.send('example api')
}) */

/* const meals = app.router() */
/* meals.get('/', (req, res) => {

}) */

app.use('/api/meals', meals)
app.use('/api/orders', orders)
app.use('/api/auth', auth)

module.exports = app