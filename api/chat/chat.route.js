const express = require('express')
const chatRouter = express.Router()
const {fetchChatRooms,createChatRoom,createChat} = require('./chat.controller')

chatRouter.post('/chatrooms',fetchChatRooms)
chatRouter.post('/chatrooms/create',createChatRoom)

chatRouter.post('/chatrooms/:roomId/chat/send',createChat)

module.exports = {chatRouter}

// Chat Room Management:

// /chatrooms - Retrieve a list of available chat rooms.
// /chatrooms/create - Create a new chat room.
// /chatrooms/:roomId - Retrieve information about a specific chat room.
// /chatrooms/:roomId/join - Allow users to join a chat room.
// /chatrooms/:roomId/leave - Allow users to leave a chat room.
// Messaging:

// /chatrooms/:roomId/messages - Retrieve the messages for a specific chat room.
// /chatrooms/:roomId/messages/send - Send a message to a specific chat room.
// Private Messaging:

// /messages/private - Retrieve private messages between two users.
// /messages/private/send - Send a private message to another user.