const {admin,db} = require('../../db/db.connection')

module.exports = {
    // controller for creating a chat room (reqBody: {uesrId,name})
    createChatRoom: async (req,res) => {
        try{
            const {userId,name} = req.body
            // create a chat room
            const chatroom = await db.collection('chatroom').doc()
            await chatroom.set({
                    roomId:chatroom.id,
                    type:"Group",
                    name:req.body.name,
                    participants:[userId],
                    createdAt: new Date()
                })

            res.status(200).json({
                roomId: chatroom.id,
                message:"room created"
            })
        }catch(e){
            console.log(e)
            res.json({e})
        }
    },

    // create chat
    createChat: async (req,res) => {
        try{
            const roomId = req.params.roomId
            const {senderId, content, name, profilePic} = req.body
            const messageRef = db.collection('chatroom').doc(roomId).collection('messages').doc()
            await messageRef.set({
                sender:senderId,
                content,
                name,
                profilePic,
                createdAt: new Date(),
            });

            res.status(201).json({
                message:"created",
                createdAt: new Date()
            })
        }catch(e){
            console.log(e)
            res.json({e})
        }
    },

    // fetch room by id
    fetchChatByRoomId: async (req,res) => {
        try{
            const roomId = req.params.roomId
            const snapshot = await db.collection('chatroom').doc(roomId).collection('messages').get()
            const messages = []
            snapshot.forEach((doc)=>{
                messages.push(doc.data())
            })

            res.status(200).json({message:messages})
        }catch(e){
            console.log(e)
            return res.json({e})
        }
    },

    // join the chat room
    joinChatRoom: async (req,res) => {
        try{
            const roomId = req.params.roomId
            const userId = req.body.userId
            const chatRoomRef = db.collection('chatroom').doc(roomId)
            const chatRoomData = await chatRoomRef.get()
            
            const participants = chatRoomData.data().participants
            participants.push(userId)

            await chatRoomRef.update({participants})

            res.status(200).json({
                message:"User joined the chat room"
            })

        }catch(e){
            console.log(e)
            return res.json({e})
        }
    },

    // leave chat room
    leaveChatRoom: async (req,res) => {
        try{
            const roomId = req.params.roomId
            const userId = req.body.userId

            const chatRoomRef = db.collection('chatroom').doc(roomId)
            const chatRoomData = await chatRoomRef.get()

            const participants = chatRoomData.data().participants
            const newParticipants = participants.filter((user)=>user !== userId)

            await chatRoomRef.update({participants:[...newParticipants]})

            res.status(200).json({message:"user leaved the chatroom"})
        }catch(e){
            console.log(e)
            res.json({e})
        }
    },

    // controller for creating a chat room (reqBody: {uesrId,name})
    createPrivateChat: async (req,res) => {
        try {
            const { senderId, receaverId, users } = req.body;

            const chatId = senderId>receaverId?senderId+"-"+receaverId:receaverId+"-"+senderId
        
            // Check if a chat room already exists between the users
            const existingPrivateRoom = await db.collection('privateroom').doc(chatId)
            const privateRoomDoc = await existingPrivateRoom.get();
            //console.log(existingPrivateRoom.empty)

            if (privateRoomDoc.exists) {
              // If a chat room already exists, return its details instead of creating a new one
              
              const privateRoomData = privateRoomDoc.data();
              const messagesDocs = await existingPrivateRoom.collection('messages').get()
             
              const messages = []

              messagesDocs.forEach((doc)=>{
                messages.push(doc.data())
              })

              return res.status(200).json({
                chatId: chatId,
                users,
                createdAt: privateRoomData.createdAt,
                type: privateRoomData.type,
                messages: messages
              });
            }
        
            // Create a new chat room document in the Firebase Firestore
            const privateRoomRef = db.collection('privateroom').doc(chatId);
            await privateRoomRef.set({
              chatId,
              users,
              type:"private",
              participants:[senderId,receaverId],
              createdAt: new Date(),
            });
        
            // Return the created chat room details as a response
            res.status(201).json({
                chatId,
                users,
                type:"private",
                createdAt: new Date(),
                message: []
            });
          } catch (error) {
            // Handle any errors that occur during the process
            console.error('Error creating private chat room:', error);
            res.status(500).json({ error: 'Failed to create private chat room' });
          }
    },

    sendPrivateChat: async (req,res) => {
        try{
            const {roomId} = req.params
            const {senderId,content,profilePic,name} = req.body
            const privateRoomRef = await db.collection('privateroom').doc(roomId)
            await privateRoomRef.collection('messages').doc().set({
                sender: senderId,
                profilePic,
                name,
                content: content,
                createdAt: new Date()
            })
    
            res.status(201).json({message:"message sent"})
        }catch(e){
            console.log(e)
            res.json({e})
        }
    },
}