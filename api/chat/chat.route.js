const express = require('express')
const chatRouter = express.Router()
const {fetchChatRooms,sendPrivateChat,fetchAllChats,fetchPrivateChat,createPrivateChat,leaveChatRoom,joinChatRoom,createChatRoom,createChat,fetchChatByRoomId} = require('./chat.controller')

chatRouter.post('/chatrooms',fetchChatRooms)
chatRouter.post('/chatrooms/create',createChatRoom)
chatRouter.post('/chatrooms/:roomId/join',joinChatRoom)
chatRouter.post('/chatrooms/:roomId/leave',leaveChatRoom)

chatRouter.post('/chatrooms/:roomId/chat/send',createChat)
chatRouter.post('/chatrooms/:roomId/chat',fetchChatByRoomId)

chatRouter.post('/private/create',createPrivateChat)
chatRouter.post('/private/send',sendPrivateChat)

chatRouter.post('/chats',fetchAllChats)

module.exports = {chatRouter}