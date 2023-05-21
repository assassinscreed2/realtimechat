import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography,Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Grid, Divider} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import firebase from "firebase/app"
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth"
import UserList from './components/UserList.js';
import Messages from './components/Messages.js';

function App(){

  const [auth, setAuth] = useState(true)
  const [token, setToken] = useState("")
  const [roomType, setRoomType] = useState()
  const [roomId, setRoomId] = useState()
  const [searchText, setSearchText] = useState('');
  const [roomList, setRoomList] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCreateGroup = async ()=>{
    const createRequest = await fetch(`${process.env.REACT_APP_SERVER}/chat/chatrooms/create`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({userId:"herokurunner3@gmail.com",name:searchText})
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
      setToken(credential.idToken)
    }).catch(e=>console.log(e))
  }

  return (
    <>
      {
        auth?<Grid container direction = "column">
        <Grid item>
          <Typography>Real Time Chat Application</Typography>
        </Grid>
        <Grid container direction = "row" >
          {/* list of users currently in chat */}
          <Grid container direction = "column" sm={3}>
            <UserList token={token} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} setRoomId={setRoomId} roomList={roomList} setRoomList={setRoomList} setRoomType={setRoomType}/>
          </Grid>
          <Grid item container direction = "column" sm={8}>
            {/* button for creating a group */}
            <Grid item>
              <TextField label="Enter Group Name" variant="outlined" value={searchText} onChange={handleInputChange}/>
              <Button onClick={()=>handleCreateGroup()}>Create Group</Button>
            </Grid>
            <Messages setRoomId={setRoomId} setRoomType={setRoomType} roomList={roomList} setSelectedRoom={setSelectedRoom} setRoomList={setRoomList} token={token} roomType={roomType} roomId={roomId}/>
          </Grid>
        </Grid>
      </Grid>:<Button variant='contained' onClick={googleLogin} >Login</Button>
      }
      
    </>
    
  );
};

export default App;
