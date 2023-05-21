const {admin,db} = require('../../db/db.connection')

module.exports = {
    fetchListOfUser: async (req,res) => {
        try{
            const useremail = req.params.useremail
            console.log(useremail)
            // firebase auth instance
            const auth = admin.auth()
    
            // retrive list of users
            const userdata = await auth.getUserByEmail(useremail)
            console.log(userdata)
            return res.status(200).json({
                email:userdata.email,
                name:userdata.displayName,
                profilephoto:userdata.photoURL
            })
        }catch(e){
            console.log(e)
            return res.json({status:0,message:"no user"})
        }
        
    }
}