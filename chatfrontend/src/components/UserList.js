import { makeStyles } from '@mui/styles';
import { TextField, List, ListItem, ListItemText, IconButton, Grid, Typography} from '@mui/material';
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

export default function UserList({setRoomId,setRoomType,roomList,setRoomList,selectedRoom,setSelectedRoom}){
    const classes = useStyles();
    
    
    const [userFound,setUserFound] = useState()
    const [newMessage, setNewMessage] = useState('');
    const [searchedUser, setSearchedUser] = useState()
    

    useEffect(()=>{
        const db = getFirestore()

        // query to fetch private chats
        const q1 = query(collection(db,'privateroom'),where('participants','array-contains','herokurunner3@gmail.com'))
        const unsub1 = onSnapshot(q1, (snapshot)=>{
            //console.log(snapshot)
            snapshot.docChanges().forEach((change)=>{
                const roomData = change.doc.data()
                
                setRoomList((prevRooms) => [...prevRooms,{id:roomData.chatId,
                    createdAt:roomData.createdAt,
                    type:roomData.type,
                    name:roomData.participants[1]}])
                //console.log(change.doc.data())
            })
        })

        // query to fetch group chats
        const q2 = query(collection(db,'chatroom'),where('participants','array-contains','herokurunner3@gmail.com'))
        const unsub2 = onSnapshot(q2, (snapshot)=>{
            //console.log(snapshot)
            snapshot.docChanges().forEach((change)=>{
              const roomData = change.doc.data()
              const userid = "herokurunner3@gmail.com"
              if(roomData.participants.includes(userid)){
                setRoomList((prevRooms) => [...prevRooms,{id:roomData.roomId,
                  createdAt:roomData.createdAt,
                  type:roomData.type,
                  name:roomData.name}])
              }
              
              //console.log(change.doc.data())
          })
        })
        
        return ()=>{
            unsub1();
            unsub2();
        }
    },[])

    const [searchText, setSearchText] = useState('');

    const handleSearch = async () => {
        if(searchText !== undefined){
            console.log(process.env.REACT_APP_SERVER)
            const searchRequest = await fetch(`${process.env.REACT_APP_SERVER}/user/${searchText}`)
            const userdata = await searchRequest.json()
            if(userdata.email){
                setUserFound(true)
                setSearchedUser(userdata)
            }else{
                setSearchedUser("User not Registered")
            }
        }
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    const handleUserClick = (room) => {
        console.log(room)
        setRoomId(room.id)
        setRoomType(room.type)
        setSelectedRoom(room);
    };

    // create a private chat room between selecter user and loggedin user
    const handleCreatePrivateRoom = async (roomDetails) => {
        const createRequest = await fetch(`${process.env.REACT_APP_SERVER}/chat/private/create`,{
            method: 'POST',
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify(roomDetails)
        })

        const result = await createRequest.json()
        console.log(result)
    }

    return (
        <Grid item container direction = "column">
            {/* search user  */}
            <Grid item>
                <TextField label="Search User" variant="outlined" value={searchText} onChange={handleInputChange}/>
                <IconButton onClick={handleSearch} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Grid>

            {/* search user result */}
            {searchedUser && <Grid item container direction="row" style={{display:searchedUser?"block":"none"}}>
                <Grid item sm={5} onClick={()=>{if(userFound){handleCreatePrivateRoom({senderId:"herokurunner3@gmail.com",receaverId:searchedUser.email})}else{setSearchedUser(undefined)}}}><Typography>{searchedUser.name}</Typography></Grid>
                <Grid item sm={5}><CloseIcon onClick={()=>setSearchedUser(undefined)}/></Grid>
            </Grid>}

            {/* show user chat rooms */}
            <Grid item>
              <List>
                {roomList.map((room) => (
                  <ListItem
                    key={room.id}
                    className={classes.listItem}
                    selected={selectedRoom && selectedRoom.id === room.id}
                    onClick={() => handleUserClick(room)}
                  >
                    <ListItemText primary={room.name} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
    )
}