import React, { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { Container, Typography,Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Grid, Divider} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Message";

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

function App(){
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [userList, setUserList] = useState([
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
    { id: 4, name: 'User 4' },
  ]);

  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    console.log("searched")
  };

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSendMessage = () => {
    // Implement the logic to send a new message to the selected user
    // You can use WebSocket or API requests to send the message

    setNewMessage('');
  };

  return (
    <>
    <Grid container direction = "column">
      <Grid item>
        <Typography>Real Time Chat Application</Typography>
      </Grid>
      <Grid container direction = "row" >
        <Grid container direction = "column" sm={3}>
          <Grid item>
            <TextField
              label="Search User"
              variant="outlined"
              value={searchText}
              onChange={handleInputChange}
            />
            <IconButton onClick={handleSearch} aria-label="search">
              <SearchIcon />
            </IconButton>
          <Grid item>
            <List>
              {userList.map((user) => (
                <ListItem
                  key={user.id}
                  className={classes.listItem}
                  selected={selectedUser && selectedUser.id === user.id}
                  onClick={() => handleUserClick(user)}
                >
                  <ListItemText primary={user.name} />
                </ListItem>
              ))}
            </List>
          </Grid>
          </Grid>
        </Grid>
        <Grid item container direction = "column" sm={8}>
          <Grid item>
            <Button>Create Group</Button>
          </Grid>
          <Grid container direction="column">
          <Grid item>
            {selectedUser ? (
              <>
                <Typography variant="h6">{selectedUser.name}</Typography>
                {/* Render the messages with the selected user */}
                {/* Example: */}
                {/* {selectedUser.messages.map((message, index) => (
                  <div key={index}>
                    <Typography variant="body1">{message.sender}</Typography>
                    <Typography variant="body2">{message.content}</Typography>
                  </div>
                ))} */}
              </>
            ) : (
              <Typography variant="h6">Select a user to start chatting</Typography>
            )}
          </Grid>
          <Grid item style={{overflowY:"auto",minHeight:"28em",maxHeight:"30em"}}>
            <MessageLeft
                message="Hi Ankur"
                timestamp="MM/DD 00:00"
                displayName="Vikas"
                avatarDisp={true}
              />
              <MessageLeft
                message="Hello How are you"
                timestamp="MM/DD 00:00"
                photoURL=""
                displayName="Vikas"
                avatarDisp={false}
              />
              <MessageLeft
                message="Hi Ankur"
                timestamp="MM/DD 00:00"
                displayName="Vikas"
                avatarDisp={true}
              />
              <MessageLeft
                message="Hello How are you"
                timestamp="MM/DD 00:00"
                photoURL=""
                displayName="Vikas"
                avatarDisp={false}
              />
              <MessageLeft
                message="Hi Ankur"
                timestamp="MM/DD 00:00"
                displayName="Vikas"
                avatarDisp={true}
              />
              <MessageLeft
                message="Hello How are you"
                timestamp="MM/DD 00:00"
                photoURL=""
                displayName="Vikas"
                avatarDisp={false}
              />
              <MessageLeft
                message="Hi Ankur"
                timestamp="MM/DD 00:00"
                displayName="Vikas"
                avatarDisp={true}
              />
              <MessageLeft
                message="Hello How are you"
                timestamp="MM/DD 00:00"
                photoURL=""
                displayName="Vikas"
                avatarDisp={false}
              />
              <MessageRight
                message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
                timestamp="MM/DD 00:00"
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName="まさりぶ"
                avatarDisp={true}
              />
              <MessageRight
                message="messageRあめんぼあかいなあいうえおあめんぼあかいなあいうえお"
                timestamp="MM/DD 00:00"
                photoURL="https://lh3.googleusercontent.com/a-/AOh14Gi4vkKYlfrbJ0QLJTg_DLjcYyyK7fYoWRpz2r4s=s96-c"
                displayName="まさりぶ"
                avatarDisp={false}
              />
          </Grid>
          <Grid item>
            <TextInput />
          </Grid>
        </Grid>
        </Grid>
      </Grid>

    </Grid>
    
    </>
    
  );
};

export default App;
