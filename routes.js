const express = require('express')
const Router = express.Router()
const routes = require('./routes/')

Router.use('/',routes.defaultRoutes)
Router.use('/messages',routes.messageRoutes)
module.exports = Router