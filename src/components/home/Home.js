import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import {Avatar, IconButton} from "@material-ui/core";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import JoinGroup from '../join group/JoinGroup'
import {motion} from 'framer-motion'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Chat from '../chat-container/Chat';
import db from '../../firebase';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import SendIcon from '@material-ui/icons/Send';
import firebase from 'firebase'
import 'firebase/auth'
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';
import { useStateValue } from '../../StateProvider';
import SidebarChat from '../sidebar-chats/SidebarChat';
import styles from './styles';
import { useHistory } from 'react-router';
import Welcome from '../welcome/Welcome';




function Home(props) {
  const history = useHistory()
  const [{user}, dispatch] = useStateValue();
  const [rooms, setRooms] = useState([]);
  const { window, classes} = props;
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [inputVisible, setInputVisible] = useState(false)
  const [roomName, setRoomName] = useState("")


  useEffect(() => {
   
    const unsubscribe = db.collection('rooms').where('users','array-contains',user.id).onSnapshot(snapshot => (
    // const unsubscribe = db.collection('rooms').where('users','array-contains',user.id).get().then(snapshot => (
     
        setRooms(snapshot.docs.map(doc => (
            {
                id: doc.id,
                roomDP: doc.data().roomDP,
                name: doc.data().name,
                users: doc.data().users
            }
        )

        ))
    ));

    

    return () => {
        unsubscribe();
    }
},[]); 

  const enableInput = ()=>{
    setInputVisible(!inputVisible)
  }


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeDrawer = ()=>{
    setMobileOpen(false)
  }

  const addNewRoom =(e)=>{
    e.preventDefault()

   
    if(roomName!=""){
      db.collection('rooms').add({
        name: roomName,
        users : firebase.firestore.FieldValue.arrayUnion(user.id),
        owner: user.id
      })
      .then(()=>{
    
        setRoomName("")
        setInputVisible(false)
      })
      .catch(e=> console.log(e))
    }
  }

  const logOut = ()=>{
    firebase.auth().signOut().then(() => {
      
  })
  }

  const handleRoomNameChange=(e)=>{
    setRoomName(e.target.value)
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} >
      <Avatar src={user?.photo}/>
      <div className={classes.appName}>
          <h1>Chatz</h1>
      </div>
      <IconButton
      onClick={logOut}
      >
                        <ExitToAppIcon titleAccess='Log Out' />
                    </IconButton>
      </div>
      <Divider />

      <List >
        <ListItem className={classes.listButtons}>
        <Button
        variant="contained"
        color="default"
        className={classes.button}
        endIcon={<AddIcon/>}
        onClick={enableInput}
      >
        Create new room
      </Button>
        </ListItem>
       
        {inputVisible && <ListItem className={classes.listButtons} >
         <form className={classes.createRoomForm} onSubmit={addNewRoom} >
           <input type="text" placeholder="Enter name of room" value={roomName}
            onChange={handleRoomNameChange} maxLength="100" />
           <IconButton onClick={addNewRoom} color="default" aria-label="create new room">
          <SendIcon style={{fill:'white'}} />
        </IconButton>
         </form>
     
        </ListItem>
          }

      
      </List>
      <Divider />
      <motion.div layout>
      <List className={classes.roomList}>
        { rooms.length >0 ?(
        rooms.map((room, index) => (
          
          <SidebarChat key={room.id} id={room.id} room={room} closeDrawer={closeDrawer} />
          
          
          // <ListItem button key={room.id}>
          //   <ListItemIcon><Avatar/></ListItemIcon>
          //   <ListItemText primary={room.name} />
          // </ListItem>
        ))) :
        (
          <>
          <div style={{padding:'1rem', textAlign:'center'}}>

          <h2>You haven't joined any room.</h2>
          <h3>You can create your own room too by clicking on Create New Room.</h3>
          </div>
          </>
        )
      }
      </List>
      </motion.div>
     
     
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>

      <CssBaseline />
      <Router>
  
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        {/* <div className={classes.toolbar} /> */}
        {/* <div className={classes.tempdiv}></div> */}
        {/* <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
          facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
          gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
          donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
          Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
          imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
          arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
          donec massa sapien faucibus et molestie ac.
        </Typography> */}
       
         <Switch>
                <Route path="/rooms/:roomId" exact> 
                  <Chat mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                </Route>
                <Route path="/" exact>
                 
                  <Welcome  mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle}/>
                
                </Route>  
                <Route path="/join/:id" exact>
                      <JoinGroup handleDrawerToggle={handleDrawerToggle} />
              </Route>              
              </Switch>   
      </main>
      </Router>
    </div>
  );
}



export default withStyles(styles)(Home);