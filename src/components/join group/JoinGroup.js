import React, { useEffect, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';
import styles from './styles';
import { useHistory, useParams } from 'react-router';
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuIcon from '@material-ui/icons/Menu';
import { IconButton } from '@material-ui/core';
import firebase from 'firebase'


function JoinGroup({classes, handleDrawerToggle}) {
  const history = useHistory()
  const {id} = useParams()
  const [{user}, dispatch] = useStateValue();
  const [alreadyInRoom, setAlreadyInRoom] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [noGroupFound, setNoGroupFound] = useState(false)
  const [room, setRoom] = useState()

  useEffect(() => {
    if(id){
    db.collection("rooms").doc(id).get().then((doc) =>{
      if(doc.exists){
        if(doc.data().users.includes(user.id)){
          setAlreadyInRoom(true)
        }else{
          setRoom(doc.data())
        }
      }
      else{
        setNoGroupFound(true)
      }
      
      setIsLoading(false)
      
    })
    .catch(e => console.log(e))   
  } 
    return () => {
      
    }

  }, [id])

  const joinGroup= ()=>{
      db.collection("rooms").doc(id).update({
        users : firebase.firestore.FieldValue.arrayUnion(user.id),
      })
      .then(()=>{

        console.log("done")
        history.push(`/rooms/${id}`)
      }
      )
  }

 if(isLoading){
   return(
    <div className={classes.container}>
    <div className={classes.header}>
            <h1>Join Room</h1>
        </div>
    <div className={classes.body}>
    <CircularProgress />
        </div>
    <div className={classes.header}>
        </div>
        </div>
   )
 }

  return (
    <div className={classes.container}>
    <div className={classes.header}>
    <IconButton className={classes.menuButton} onClick={()=>handleDrawerToggle(true)}>
                        <MenuIcon />
                    </IconButton>
            <h1>Join Room</h1>
        </div>
    <div className={classes.body}>
      <div>
      {
        noGroupFound ? (
            <h1>Your room link is invalid.</h1>
        ) : (
          <>
          {
            alreadyInRoom ? (
              <>
              <h1>You are already part of this room.</h1>
              <h1>Check your rooms section.</h1>
              </>
            ) : (
            <>
           
          <h1>You are invited to join <span className={classes.roomName}>{room?.name}</span> room.</h1> 
            
        
            <h2>Do you want to join this room?</h2>
            <div>
            <Button
              variant="contained"
              color="default"
              className={classes.yesButton}
              startIcon={<CheckIcon />}
              onClick={joinGroup}
          >
            Yes
          </Button>
            <Button
              variant="contained"
              color="default"
              className={`${classes.yesButton} ${classes.noButton}`}
              startIcon={<CheckIcon />}
              onClick={()=>history.goBack()}
          >
            Cancel
          </Button>
            </div>
            </>
             )
            }
            </>
            
          
        )
      }
            
            </div>
        </div>
    <div className={classes.header}>
        </div>
        </div>
  );
}

export default withStyles(styles)(JoinGroup)