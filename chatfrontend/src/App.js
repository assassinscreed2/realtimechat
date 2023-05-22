import React, { useState } from 'react';
import { makeStyles, styled } from '@mui/styles';
import { Container, AppBar, Typography,Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Grid, Divider, Toolbar} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import firebase from "firebase/app"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import UserList from './components/UserList.js';
import Messages from './components/Messages.js';

function App(){

  const [auth, setAuth] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  const [token, setToken] = useState("")
  const [roomType, setRoomType] = useState()
  const [roomId, setRoomId] = useState()
  const [searchText, setSearchText] = useState("");
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([])
  const [userLogged, setUserLogged] = useState()

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCreateGroup = async ()=>{
    if(searchText.length>0){
      const createRequest = await fetch(`${process.env.REACT_APP_SERVER}/chat/chatrooms/create`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({userId:userLogged.email,name:searchText})
      })
  
      const createResponse = await createRequest.json()
      console.log(createResponse)
    }
  }

  const googleLogin = () => {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then((result)=> {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      setAuth(true)
      setUserLogged({email:result.user.email,
        name:result.user.displayName,
        photo:result.user.photoURL
      })
      console.log(userLogged)
      setToken(credential.idToken)
    }).catch(e=>console.log(e))
  }

  return (
    <>
      {auth?<Grid container direction = "column" alignItems="center" justifyContent="center" style={{backgroundColor:"#DBDFEA",width:"100%",minHeight:"100vh"}}>
        <AppBar>
          <Toolbar position="sticky" style={{justifyContent:"center"}}>
          <Typography style={{fontSize:"2rem"}}>Real Time Chat Application</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid container direction = "row" justifyContent="space-around" style={{backgroundColor:"#F6F1F1",maxWidth:"95%"}}>
          {/* list of users currently in chat */}
          <Grid container direction = "column" sm={3} style={{maxWidth:"18em",borderRight:"blue solid 2px",backgroundColor:"#E3F4F4"}}>
            <UserList setMessages={setMessages} setSelectedUser={setSelectedUser} userLogged={userLogged} token={token} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} setRoomId={setRoomId} roomList={roomList} setRoomList={setRoomList} setRoomType={setRoomType}/>
          </Grid>
          <Grid item container direction = "column" sm={8}>
            {/* button for creating a group */}
            <Grid item container direction="row" justifyContent="flex-end" alignItems="center" style={{minHeight:"3em",marginTop:"0.5em",borderBottom:"solid 2px #B0DAFF"}}>
              <TextField style={{marginRight:"1em"}} size="small" label="Enter Group Name" variant="outlined" value={searchText} onChange={handleInputChange}/>
              <Button variant="outlined" size='small' onClick={()=>handleCreateGroup()}>Create Group</Button>
            </Grid>
            <Messages messages={messages} setMessages={setMessages} selectedUser={selectedUser} userLogged={userLogged} setRoomId={setRoomId} setRoomType={setRoomType} roomList={roomList} setSelectedRoom={setSelectedRoom} setRoomList={setRoomList} token={token} roomType={roomType} roomId={roomId}/>
          </Grid>
        </Grid>
      </Grid>:<Button variant='contained' onClick={googleLogin} >Login</Button>
      }
      
    </>
    
  );
};

export default App;
