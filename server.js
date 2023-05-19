const express = require('express')
const app = express()
const {chatRouter} = require('./api/chat/chat.route')

require('dotenv').config()



app.use(express.json())
app.use('/chat',chatRouter)

app.listen(process.env.PORT,()=>{
    console.log("server running on port "+process.env.PORT)
})