import { Avatar, Typography } from "@mui/material";
import { createStyles, makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    messageRow: {
      display: "flex"
    },
    messageRowRight: {
      display: "flex",
      justifyContent: "flex-end"
    },
    messageBlue: {
      minHeight:"2.6em",
      minWidth:"10em",
      position: "relative",
      marginLeft: "0.2em",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor:"#E6FFFD",
      width: "100%",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "5px solid #ACBCFF",
      borderRadius: "10px",
      overflowWrap: "break-word"
    },
    messageOrange: {
      position: "relative",
      marginRight: "20px",
      marginBottom: "10px",
      padding: "10px",
      backgroundColor: "#E5F9DB",
      width: "50%",
      //height: "50px",
      textAlign: "left",
      font: "400 .9em 'Open Sans', sans-serif",
      border: "5px solid #AEE2FF",
      borderRadius: "10px",
      overflowWrap: "break-word"  
    },

    messageContent: {
      padding: 0,
      margin: 0
    },
    messageTimeStampRight: {
      position: "absolute",
      fontSize: ".85em",
      fontWeight: "300",
      marginTop: "10px",
      marginBottom: "6px",
      bottom: "-3px",
      right: "5px"
    },
    displayName: {
      marginLeft: "20px"
    }
  })
);



export const MessageLeft = ({message}) => {
  // message={message.content}
  //                               timestamp={message.createdAt.seconds}
  //                               displayName={message.name}
  //                               avatar={message.profilePic}
  const classes = useStyles();
  function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    const formattedTime = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: '2-digit',
      month: '2-digit',
    });
    return formattedTime;
  }

  return (
    <>
      <div className={classes.messageRow}>
        <Avatar src={message.profilePic}/>
        <div style={{maxWidth:"50%"}}>
          <Typography style={{fontSize:"0.7em",marginLeft:"0.8em"}}>{message.name}</Typography>
          <div  className={classes.messageBlue}>
            <div>
            <Typography style={{fontSize:"1em"}}>{message.content}</Typography>
            </div>
            <div className={classes.messageTimeStampRight}>{formatTime(message.createdAt.seconds)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MessageRight = ({message}) => {
  const classes = useStyles();

  function formatTime(seconds) {
    const date = new Date(seconds * 1000);
    const formattedTime = date.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      day: '2-digit',
      month: '2-digit',
    });
    return formattedTime;
  }

  return (
    <div className={classes.messageRowRight}>
      <div className={classes.messageOrange}>
        <Typography style={{fontSize:"1em"}}>{message.content}</Typography>
        <div className={classes.messageTimeStampRight}>{formatTime(message.createdAt.seconds)}</div>
      </div>
    </div>
  );
};
