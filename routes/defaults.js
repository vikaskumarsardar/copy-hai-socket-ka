const express = require('express')
const Router = express.Router()
const {message} = require('../controllers')

Router.get('/',message.defaultPage)
module.exports = Router