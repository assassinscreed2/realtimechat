const express = require('express')
const app = express()
const cors = require('cors')
const {chatRouter} = require('./api/chat/chat.route')
const {UserRouter} = require('./api/user/user.route')
const {authencateUser} = require('./api/middleware/auth')
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.use(authencateUser)

app.use('/chat',chatRouter)
app.use('/user',UserRouter)

app.listen(process.env.PORT,()=>{
    console.log("server running on port "+process.env.PORT)
})