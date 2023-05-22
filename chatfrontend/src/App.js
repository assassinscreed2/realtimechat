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
  const [token, setToken] = useState("")
  const [roomType, setRoomType] = useState()
  const [roomId, setRoomId] = useState()
  const [searchText, setSearchText] = useState('');
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [userLogged, setUserLogged] = useState({email:'herokurunner3@gmail.com',
    name:'Ankur',
    photo:"image.com"
  })

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCreateGroup = async ()=>{
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
      {/* {
        auth? */}
        <Grid container direction = "column">
        <AppBar>
          <Toolbar position="sticky" style={{justifyContent:"center"}}>
          <Typography style={{fontSize:"2rem"}}>Real Time Chat Application</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid container direction = "row" >
          {/* list of users currently in chat */}
          <Grid container direction = "column" sm={3} style={{maxWidth:"18em",borderRight:"blue solid 2px",backgroundColor:"#E3F4F4"}}>
            <UserList userLogged={userLogged} token={token} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} setRoomId={setRoomId} roomList={roomList} setRoomList={setRoomList} setRoomType={setRoomType}/>
          </Grid>
          <Grid item container direction = "column" sm={8}>
            {/* button for creating a group */}
            <Grid item>
              <TextField label="Enter Group Name" variant="outlined" value={searchText} onChange={handleInputChange}/>
              <Button onClick={()=>handleCreateGroup()}>Create Group</Button>
            </Grid>
            <Messages userLogged={userLogged} setRoomId={setRoomId} setRoomType={setRoomType} roomList={roomList} setSelectedRoom={setSelectedRoom} setRoomList={setRoomList} token={token} roomType={roomType} roomId={roomId}/>
          </Grid>
        </Grid>
      </Grid>
      {/* :<Button variant='contained' onClick={googleLogin} >Login</Button>
      } */}
      
    </>
    
  );
};

export default App;
