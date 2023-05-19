const {admin,db} = require('../../db/db.connection')

module.exports = {
    // controller for fetching all chatrooms of a user
    fetchChatRooms : async () => {
        try{
            const userId = req.body.userId
            const snapshot = await db.collection('chatroom').where('participants','array-contains',userId).get()
            
            const chatRooms = []
            snapshot.forEach((doc)=>{
                chatRooms.push(doc['_fieldsProto'])
            })
    
            return res.json({response:chatRooms});
        }catch(e){
            console.log(e)
            res.json({e});
        }
    },

    // controller for creating a chat room (reqBody: {uesrId,name})
    createChatRoom: async (req,res) => {
        try{
            const userId = req.body.userId

            // create a chat room
            const chatroom = await db.collection('chatroom').doc()
            await chatroom.set({roomId:"23",
                    name:req.body.name,
                    participants:[userId],
                    createdAt: new Date()
                })
            
            const messageRef = await chatroom.collection('messages').doc()
            await messageRef.set({
                createdAt: new Date(),
                content: "Created Successfully"
            })
            console.log(messageRef)
            

            res.status(200).json({
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
            const {roomId, senderId, content} = req.body
            const messageId = "message1"
            const messageRef = db.collection('chatroom').doc(roomId).collection('messages').doc(messageId)
            await messageRef.set({
                messageId,
                senderId,
                content,
                timestamp: new Date(),
            });

            res.status(201).json({
                messageId,
                senderId,
                content,
                timestamp: new Date()
            })
        }catch(e){
            console.log(e)
            res.json({e})
        }
    }
}