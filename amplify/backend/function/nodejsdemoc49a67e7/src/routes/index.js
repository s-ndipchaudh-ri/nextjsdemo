const express = require('express')
const app = express()

//imports route files
const customer = require('./customer')
const vendor = require('./vendor')
const user = require('./user')

//define routes
app.use('/customers',customer)
app.use('/vendors',vendor)
app.use('/users',user)


module.exports = app;
