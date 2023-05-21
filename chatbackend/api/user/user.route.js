const express = require('express')
const UserRouter = express()

const {fetchListOfUser} = require('./user.controller.js')

UserRouter.get('/:useremail',fetchListOfUser)

module.exports = {UserRouter}