import React, { useState } from 'react';
import { makeStyles, styled } from '@mui/styles';
import { Container, AppBar, Typography,Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Grid, Divider, Toolbar, Avatar, CircularProgress, Backdrop} from '@mui/material';
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
  const [createGroupLoading, setCreateGroupLoading] = useState()

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleCreateGroup = async ()=>{
    if(searchText.length>0){
      setCreateGroupLoading(true)
      const createRequest = await fetch(`${process.env.REACT_APP_SERVER}/chat/chatrooms/create`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          'authorization':`Bearer ${token}`
        },
        body:JSON.stringify({userId:userLogged.email,name:searchText})
      })
  
      const createResponse = await createRequest.json()
      setCreateGroupLoading(false)
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
      auth.currentUser.getIdToken().then((idtoken)=>{
        setToken(idtoken)
      })
      
    }).catch(e=>console.log(e))
  }

  return (
    <>
      {auth?<Grid container direction = "column" alignItems="center" justifyContent="center" style={{backgroundColor:"#DBDFEA",width:"100%",minHeight:"100vh"}}>
        <AppBar>
          <Toolbar position="sticky" style={{justifyContent:"center"}}>
              <Grid container direction = "row">
                <Grid item sm><Typography style={{fontSize:"2rem",marginLeft:"2em"}}>Real Time Chat Application</Typography></Grid>
                <Grid item container sm alignItems="center" justifyContent="flex-end">
                  <Grid item style={{marginRight:"1em"}}>
                    <Avatar src={userLogged.photo}/>
                  </Grid>
                  <Grid item>
                    <Typography>{userLogged.name}</Typography></Grid>
                  </Grid>
              </Grid>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <Grid container direction = "row" justifyContent="space-around" style={{backgroundColor:"#F6F1F1",maxWidth:"95%"}}>
          {/* list of users currently in chat */}
          <Grid container direction = "column" sm={3} style={{maxWidth:"18em",borderRight:"blue solid 2px",backgroundColor:"#E3F4F4"}}>
            <UserList token={token} setMessages={setMessages} setSelectedUser={setSelectedUser} userLogged={userLogged} selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} setRoomId={setRoomId} roomList={roomList} setRoomList={setRoomList} setRoomType={setRoomType}/>
          </Grid>
          <Grid item container direction = "column" sm={8}>
            {/* button for creating a group */}
            <Grid item container direction="row" justifyContent="flex-end" alignItems="center" style={{minHeight:"3em",marginTop:"0.5em",borderBottom:"solid 2px #B0DAFF"}}>
              {createGroupLoading && <CircularProgress />}
              <TextField style={{marginRight:"1em"}} size="small" label="Enter Group Name" variant="outlined" value={searchText} onChange={handleInputChange}/>
              <Button disabled={createGroupLoading} variant="outlined" size='small' onClick={()=>handleCreateGroup()}>Create Group</Button>
            </Grid>
            <Messages token={token} setSelectedUser={setSelectedUser} messages={messages} setMessages={setMessages} selectedUser={selectedUser} userLogged={userLogged} setRoomId={setRoomId} setRoomType={setRoomType} roomList={roomList} setSelectedRoom={setSelectedRoom} setRoomList={setRoomList} roomType={roomType} roomId={roomId}/>
          </Grid>
        </Grid>
      </Grid>:<Button variant='contained' onClick={googleLogin} >Login</Button>
      }
      
    </>
    
  );
};

export default App;
