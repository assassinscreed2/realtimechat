const express = require('express')
const chatRouter = express.Router()
const {fetchChatRooms,leaveChatRoom,joinChatRoom,createChatRoom,createChat,fetchChatRoomById} = require('./chat.controller')

chatRouter.post('/chatrooms',fetchChatRooms)
chatRouter.post('/chatrooms/create',createChatRoom)
chatRouter.post('/chatrooms/:roomId',fetchChatRoomById)
chatRouter.post('/chatrooms/:roomId/join',joinChatRoom)
chatRouter.post('/chatrooms/:roomId/leave',leaveChatRoom)

chatRouter.post('/chatrooms/:roomId/chat/send',createChat)
// chatRouter.post('/chatrooms/:roomId/chat',fetchChat)

// chatRouter.post('/private',fetchPrivateChat)
// chatRouter.post('/private/send',createPrivateChat)

// chatRouter.post('/chats',fetchAllChats)

module.exports = {chatRouter}