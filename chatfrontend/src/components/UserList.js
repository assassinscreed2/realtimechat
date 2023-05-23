import { makeStyles } from '@mui/styles';
import { TextField,CircularProgress , List, ListItem, ListItemText, IconButton, Grid, Typography} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import {collection, query, where, onSnapshot, getFirestore} from "firebase/firestore"


const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    },
    chatContainer: {
      display: 'flex',
      width: '600px',
      height: '500px',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    },
    userList: {
      flex: '0 0 200px',
      borderRight: `1px solid `,
    },
    chatArea: {
      flex: '1',
    },
    listItem: {
      cursor: 'pointer',
    },
    inputContainer: {
      display: 'flex',
      alignItems: 'center',
    },
    textField: {
    },
  }));

export default function UserList({token,setMessages,setSelectedUser,userLogged,setRoomId,setRoomType,roomList,setRoomList,selectedRoom,setSelectedRoom}){
    const classes = useStyles();
    
    const [userFound,setUserFound] = useState()
    const [newMessage, setNewMessage] = useState('')
    const [searchedUser, setSearchedUser] = useState()
    const [userSearchLoading,setUserSearchLoading] = useState(false)
    const [roomListLoading,setRoomListLoading] = useState(false)
    

    useEffect(()=>{
      console.log(userLogged)
      if(userLogged){
        const db = getFirestore()

        // query to fetch private chats
        const q1 = query(collection(db,'privateroom'),where('participants','array-contains',userLogged.email))
        const unsub1 = onSnapshot(q1, (snapshot)=>{
            setRoomListLoading(true)
            //console.log(snapshot)
            snapshot.docChanges().forEach((change)=>{
                const roomData = change.doc.data()
                console.log(roomData)
                setRoomList((prevRooms) => [...prevRooms,{id:roomData.chatId,
                    createdAt:roomData.createdAt,
                    type:roomData.type,
                    name:roomData.name}])
                //console.log(change.doc.data())
            })
            setRoomListLoading(false)
        })

        // query to fetch group chats
        const q2 = query(collection(db,'chatroom'),where('participants','array-contains',userLogged.email))
        const unsub2 = onSnapshot(q2, (snapshot)=>{
            setRoomListLoading(true)
            //console.log(snapshot)
            snapshot.docChanges().forEach((change)=>{
              console.log(change)
              if(change.type === 'added'){
                const roomData = change.doc.data()
                console.log(roomData)
                  const exists = roomList.some((room)=>room.id === roomData.roomId)
                  if(!exists){
                    setRoomList((prevRooms) => [...prevRooms,{id:roomData.roomId,
                      createdAt:roomData.createdAt,
                      type:roomData.type,
                      name:roomData.name}])
                  }
              }
              //console.log(change.doc.data())
            })
            setRoomListLoading(false)
        })
        
        return ()=>{
            unsub1();
            unsub2();
        }
      }
    },[userLogged])

    const [searchText, setSearchText] = useState('');

    const handleSearch = async () => {
        if(searchText === userLogged.email){
          setSearchedUser("Enter Others email")
          return;
        }
        if(searchText !== undefined){
            setUserSearchLoading(true)
            const searchRequest = await fetch(`${process.env.REACT_APP_SERVER}/user/${searchText}`,{
              method:'GET',
              headers:{
                'authorization':`Bearer ${token}`
              }
            })
            const userdata = await searchRequest.json()
            console.log("userdata",userdata)
            if(userdata.email){
                setSearchedUser(userdata)
                setUserSearchLoading(false)
                setUserFound(true)
                
            }else{
                setUserSearchLoading(false)
                setSearchedUser("User not Registered")
            }

            console.log(searchedUser)
        }
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleUserClick = (room) => {
        setRoomId(room.id)
        setRoomType(room.type)
        setSelectedUser(room.name)
        setSelectedRoom(room);
    };

    // create a private chat room between selecter user and loggedin user
    const handleCreatePrivateRoom = async (roomDetails) => {
      console.log("roomDetails",roomDetails)
        
        const createRequest = await fetch(`${process.env.REACT_APP_SERVER}/chat/private/create`,{
            method: 'POST',
            headers:{
                'Content-Type':"application/json",
                'authorization':`Bearer ${token}`
            },
            body: JSON.stringify({senderId:userLogged.email,receaverId:roomDetails.email,name:roomDetails.name})
        })

        const result = await createRequest.json()

        // setSelectedUser(roomDetails.name)
        // setSelectedRoom({id:result.chatId,createdAt:result.createdAt,type:result.type,name:result.name})
        // setMessages((prevMessages)=>[...result.message])
        // setRoomId(result.chatId)
         setSearchedUser(undefined)
        console.log(result)
    }

    return (
        <Grid item container direction = "column" alignItems="center" >
            {/* search user  */}
            <Grid item style={{marginTop:"1em"}}>
                <TextField size="small" style={{backgroundColor:"#79E0EE"}} label="Search User" variant="outlined" value={searchText} onChange={handleInputChange}/>
                <IconButton onClick={handleSearch} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Grid>
            {/* loading */}
            {
              userSearchLoading && <CircularProgress style={{margintTop:"0.3em"}} />
            }
            {/* search user result */}
            {userFound && searchedUser && <Grid item container direction="row" alignItems="center" justifyContent="space-around" style={{border:"solid 2px #19A7CE",maxWidth:"90%",marginRight:"1em",marginTop:"0.5em",minHeight:"3em",borderRadius:"5%",display:searchedUser?"flex":"none"}}>
                <Grid item sm={10} style={{}} onClick={()=>{if(userFound){console.log("searchedUser",searchedUser);handleCreatePrivateRoom(searchedUser)}else{setSearchedUser(undefined)}}}>
                  <Typography style={{textAlign:"center"}}>{searchedUser.name}</Typography>
                </Grid>
                <Grid item sm={2} style={{}}>
                  <CloseIcon onClick={()=>{setSearchedUser(undefined); setUserFound(undefined)}}/>
                </Grid>
            </Grid>}
            {
              !userFound && searchedUser && <Grid item container direction="row" alignItems="center" justifyContent="space-around" style={{border:"solid 2px #19A7CE",maxWidth:"90%",marginRight:"1em",marginTop:"0.5em",minHeight:"3em",borderRadius:"5%",display:searchedUser?"flex":"none"}}>
              <Grid item sm={10} style={{}} onClick={()=>{if(userFound){handleCreatePrivateRoom({senderId:userLogged.email,receaverId:searchedUser.email,name:searchedUser.name})}else{setSearchedUser(undefined)}}}>
                <Typography style={{textAlign:"center"}}>{searchedUser}</Typography>
              </Grid>
              <Grid item sm={2} style={{}}>
                <CloseIcon onClick={()=>setSearchedUser(undefined)}/>
              </Grid>
          </Grid>
            }

            {/* show user chat rooms */}
            {
              roomListLoading && <CircularProgress />
            }
            {
              !roomListLoading && <Grid item style={{width:"90%", maxHeight:"35em", overflowY:"auto"}}>
              <List>
                {roomList.map((room) => (
                  <ListItem
                    key={room.id}
                    style={{border:"solid 2px #98EECC",borderRadius:"5%",margin:"0.5em 0.5em 0.5em 0"}}
                    selected={selectedRoom && selectedRoom.id === room.id}
                    onClick={() => handleUserClick(room)}
                  >
                    <ListItemText primary={room.name} />
                  </ListItem>
                ))}
              </List>
            </Grid>
            }
          </Grid>
    )
}