const express = require('express')
const UserRouter = express()

const {fetchUser} = require('./user.controller.js')

UserRouter.get('/:useremail',fetchUser)

module.exports = {UserRouter}