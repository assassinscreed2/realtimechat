# Getting Started with Real Time Chat Application

This project was built using React, Nodejs and Firebase (Firestore) tools
### Link for the hosted website
 (https://demopart-7e25b.web.app/)

## How to Run

To run this project
1> first create a .env file in react frontent folder
2> create a key value pair (REACT_APP_SERVER=http://localhost:3000)
3> run comman (npm start) to run the frontend

## APIs

### 1> Create a Group Chat Room
API Endpoint: '/chat/chatrooms/create'
API method: 'POST'
API body: {userId:'email of user',name: 'name of group'}

API request need to have authorization header to validate user

This API creates a group chat.

### 2> JOIN the group chat
API Endpoint: '/chat/chatrooms/:roomId/join'
API method: 'POST'
API body: {userId:'email of user'}

API request need to have authorization header to validate user

This API adds the given user to the group chat.

### 3> LEAVE the group chat
API Endpoint: '/chat/chatrooms/:roomId/leave'
API method: 'POST'
API body: {userId:'email of user'}

API request need to have authorization header to validate user

This API removes the given user from the group chat.

### 4> Send Chat in the Group
API Endpoint: '/chat/chatrooms/:roomId/chat/send'
API method: 'POST'
API body: {senderId:'sender email', 
            content:'message data',
            name: 'Name of the sender',
            profilePic: 'Profile Pic of the sender'
          } 

API request need to have authorization header to validate user

This API sends the chat to the group with provided roomId.

### 5> Fetch chats from a Group
API Endpoint: '/chat/chatrooms/:roomId/chat'
API method: 'POST'
API body: {}

API request need to have authorization header to validate user

This API fetches chats from a group using roomId.

### Create a Chat room between two users
API Endpoint: '/private/create'
API method: 'POST'
API body: {senderId : 'email id of sender',
            receaverId: 'email id of receaver',
            users : {
                user1: {
                    name,profilePic
                },
                user2: {
                    name, profilePic
                }
            }
        }

API request need to have authorization header to validate user

This API creates a private chat between two users.

### Send a chat to a perticular user
API Endpoint: '/chat/:roomId/private/send'
API method: 'POST'
API body: {senderId: 'email of sender',
            content: 'message data',
            profilePic: 'profile pic of sender',
            name: 'name of sender'
        }

API request need to have authorization header to validate user

This API sends a chat to a perticular user.