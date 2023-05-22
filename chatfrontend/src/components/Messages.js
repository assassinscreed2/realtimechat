import { Button, Dialog, IconButton, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography, CircularProgress, Backdrop} from "@mui/material";
import { MessageLeft, MessageRight } from "./MessageBox";
import React, { useEffect, useState } from 'react';
import {collection, query, where, onSnapshot, getFirestore, orderBy} from "firebase/firestore"
import SearchIcon from '@mui/icons-material/Search';


export default function Messages({setSelectedUser,setMessages,messages,selectedUser,userLogged,setRoomType,setRoomId,roomType,roomId,setRoomList,roomList,setSelectedRoom}){
    
    const [searchText, setSearchText] = useState('');
    const [searchUserText, setUserSearchText] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState('');
    const [userFound,setUserFound] = useState()
    const [searchedUser, setSearchedUser] = useState()
    const [dialogUserLoading, setDialogUserLoading] = useState(false)
    const [messageLoading, setMessageLoading] = useState(false)

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleTextFieldChange = (event) => {
        setTextFieldValue(event.target.value);
    };

    const handleUserSearch = async () => {
        if(searchText !== undefined){
            setDialogUserLoading(true)
            console.log(process.env.REACT_APP_SERVER)
            const searchRequest = await fetch(`${process.env.REACT_APP_SERVER}/user/${searchUserText}`)
            const userdata = await searchRequest.json()
            if(userdata.email){
                setSearchedUser(userdata)
                setUserFound(true)
                setDialogUserLoading(false)
            }else{
                setSearchedUser("User not Registered")
                setDialogUserLoading(false)
            }
        }
    };

    const addUserToGroup = async () => {
        const addRequest = await fetch(`${process.env.REACT_APP_SERVER}/chat/chatrooms/${roomId}/join`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({userId:searchedUser.email})
        })
        const addResponse = await addRequest.json()
        console.log(addResponse)
        setIsOpen(false)
    }

    const leaveUserFromGroup = async () => {
        const removeRequest = await fetch(`${process.env.REACT_APP_SERVER}/chat/chatrooms/${roomId}/leave`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({userId:userLogged.email})
        })
        const removeResponse = await removeRequest.json()
        const newRoomList = roomList.filter((room)=>room.id != roomId)
        setRoomList((prevRoomList) => [...newRoomList])
        setSelectedRoom(null)
        setMessages([])
        setRoomId(undefined)
        setRoomType(undefined)
        setSelectedUser(null)
        console.log(removeResponse)
    }

    useEffect(()=>{
        const db = getFirestore()
        // query to fetch group chats
        if(roomType && roomId){
            setMessages([])
            setMessageLoading(true)
            const collectionName = roomType === "Group"?'chatroom':'privateroom'
            console.log(roomId)
            const q2 = query(collection(db,collectionName,roomId,"messages"),orderBy("createdAt","asc"))
            const unsub2 = onSnapshot(q2, (snapshot)=>{
                console.log(snapshot)
                snapshot.docChanges().forEach((change)=>{
                    console.log("messages",change.doc.data())
                    setMessages((prevMessages)=>[...prevMessages,change.doc.data()])
                })
            })
    
            setMessageLoading(false)
            return ()=>{
                unsub2();
            }
        }
        
    },[roomId])

    // send message handler
    const sendMessage = async () => {
        const collectionName = roomType == 'Group'?'chatroom':'privateroom'
        console.log(userLogged)
        if(collectionName === 'privateroom'){
            const sendRequest = await fetch(`${process.env.REACT_APP_SERVER}/chat/${roomId}/private/send`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({senderId:userLogged.email,profilePic:userLogged.photo,name:userLogged.name,content:searchText})
            })
            const sendResult = await sendRequest.json()
            console.log(sendResult)
        }else{
            const sendRequest = await fetch(`${process.env.REACT_APP_SERVER}/chat/chatrooms/${roomId}/chat/send`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({senderId:userLogged.email,profilePic:userLogged.photo,name:userLogged.name,content:searchText})
            })
            const sendResult = await sendRequest.json()
            console.log(sendResult)
        }
    }

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleSearchChange = (event) => {
        setUserSearchText(event.target.value)
    }

    return (
        <Grid container direction="column">
            {messageLoading && <Backdrop />}
            <Grid item container direction = "row" justifyContent="space-between">
                <Grid item style={{marginTop:"0.5em",borderBottom:"solid 2px #AFD3E2"}}>
                    {selectedUser ? (
                        <Typography variant="h6">{selectedUser}</Typography>
                    ) : (
                    <Typography variant="h6">Select a user to start chatting</Typography>
                    )}
                </Grid>
                {roomType && roomType === 'Group' && <Grid item style={{marginTop:"0.5em"}}>
                    <Button variant="outlined" size="small" style={{marginRight:"1em"}} onClick={handleOpen}>Add Member</Button>
                    <Button variant="outlined" size="small" onClick={leaveUserFromGroup}>Leave</Button>
                </Grid>}
            </Grid>
            <Dialog open={isOpen} onClose={handleClose} >
                <DialogTitle><Typography>Search User</Typography></DialogTitle>
                <DialogContent>
                    <Grid container justifyContent="center" spacing={2} alignItems="center">
                    <Grid item>
                        <TextField size="small" label="Enter user email" variant="outlined" value={searchUserText} onChange={handleSearchChange}/>
                        <IconButton onClick={handleUserSearch} aria-label="search">
                            <SearchIcon />
                        </IconButton>
                    </Grid>
                    
                </Grid>
                {/* loading */}
                {
                    dialogUserLoading && <CircularProgress style={{margintTop:"0.3em"}} />
                }
                {userFound && <Grid item container direction="row" justifyContent="center" alignItems="center" style={{minHeight:"2em",display:searchedUser?"block":"none",border:"solid 2px #19A7CE"}}>
                    <Grid item><Typography style={{textAlign:"center"}}>{searchedUser.name}</Typography></Grid>
                </Grid>}
                </DialogContent>
                <DialogActions>
                <Grid container justifyContent='flex-end' direction = "row">
                <Button variant="outlined" disabled={userFound?false:true} color="primary" onClick={addUserToGroup}>
                        Add
                    </Button>
                    <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                </Grid>
                
                </DialogActions>
            </Dialog>
            <Grid item style={{overflowY:"auto",minHeight:"30em",maxHeight:"30em",marginTop:"1em"}}>
                {
                    messages.map((message)=>{
                        if(message.sender !== userLogged.email){
                            return <MessageLeft message={message}/>
                        }else{
                            return <MessageRight message={message}/>
                        }
                    })
                }
            </Grid>
            {roomId && <Grid item style={{display: "flex",justifyContent: "center",width: "95%",margin: ` auto`}}>
                <TextField
                    id="standard-text"
                    label="Enter Message"
                    style={{width:"100%"}}
                    //margin="normal"
                    value={searchText} onChange={handleInputChange}
                />
                <Button variant="contained" color="primary" onClick={()=>{sendMessage()}}>
                    <SearchIcon />
                </Button>
            </Grid>}
        </Grid>
        
    )
}