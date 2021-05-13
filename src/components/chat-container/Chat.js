import React, {useState,useEffect, useRef, createRef} from 'react';
import {Avatar, IconButton, withStyles} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DoneIcon from '@material-ui/icons/Done';
import Grow from '@material-ui/core/Grow';
import MenuList from '@material-ui/core/MenuList';
import EditIcon from '@material-ui/icons/Edit';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ReplyIcon from '@material-ui/icons/Reply';
import DeleteIcon from '@material-ui/icons/Delete';
import InsertPhotoIcon from '@material-ui/icons/InsertPhoto';
import LinearProgress from '@material-ui/core/LinearProgress';
import CallMadeIcon from '@material-ui/icons/CallMade';
import WallpaperIcon from '@material-ui/icons/Wallpaper';

import {motion} from 'framer-motion'

// import './Chat.css';
import { useHistory, useParams } from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';
import {useStateValue} from "../../StateProvider";
import styles from './styles';
import moment from 'moment'
import InviteLinkModal from '../invite-link-modal/InviteLinkModal';
import useStorage from '../../helper/useStorage';
import { useMediaQuery } from 'react-responsive'

function Chat({classes, handleDrawerToggle}) {
  const [seed, setSeed] = useState("");
  const {roomId} = useParams();
  const [room, setRoom] = useState("");
  const [messages, setMessages] = useState([]);
  const [{user}, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef(null);
  const [openModal, setOpenModal] = useState(false)
  const [editGroupInfo, setEditGroupInfo] = useState(false)
  const [editingName, setEditingName] = useState(false)
  const [input, setInput] = useState("");
  const [editRoomNameInput, setEditRoomNameInput] = useState("")
  const [repliedToMessage, setRepliedToMessage] = useState(null)
  const [refs, setRefs] = useState(null)
  const [iconsId, setIconsId] = useState(null)
  const [image, setImage]= useState(null)
  const [roomDP, setRoomDP]= useState(null)

  const isMobile = useMediaQuery({
    query: '(max-device-width: 768px)'
  })

  const history = useHistory()
  const inputRef = useRef()

  const scrollRef = useRef()

  const {url, progress} = useStorage(image,user, roomId, repliedToMessage, roomDP)

    useEffect(()=>{
        
        if(roomId){
           const unsubscribe = db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoom(snapshot.data());
                setEditRoomNameInput(snapshot.data().name);
     
            });

           const unsubscribe2 = db.collection('rooms').doc(roomId).collection("messages").orderBy("timestamp","asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc =>( {
                  id: doc.id,
                  message: doc.data().message,
                  name: doc.data().name,
                  userId: doc.data().userId,
                  timestamp: doc.data().timestamp,
                  isImage: doc.data().isImage,
                  url: doc.data().url,
                  repliedTo : doc.data().repliedTo
                })))

                setRefs(snapshot.docs.reduce((acc,doc)=>{
                  acc[doc.id] = createRef()
                  return acc;
                },{}))

                scrollRef.current.scrollIntoView({behavior: 'smooth'});
          
            });

            return ()=> {
              unsubscribe()
              unsubscribe2()
            }
        }

       
    },[roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, [roomId]);

    
    useEffect(() => {
      if(editGroupInfo)
      inputRef.current.focus()
     
    },[editingName])


    useEffect(() => {
      setRefs(messages.reduce((acc,message)=>{
        acc[message.id] = createRef()
        return acc;
      },{}))

   
      return () => {
        
      }
    }, [messages])
   
    
    const tarea = document.querySelector('.autoresize')



    const sendMessage = async () => {
        if(input!=""){
          if(repliedToMessage){
           await db.collection('rooms').doc(roomId).collection('messages').add({
              message: input,
              name: user.name,
              userId: user.id,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              repliedTo : repliedToMessage
          })
          .then(()=> {
           
            setRepliedToMessage(null)})
          }
          else{
            await db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.name,
            userId: user.id,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        }).then(()=>{
         
        })
        }
        setInput("");
        tarea.setAttribute('style','height:100%');
        scrollRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    const handleInputChange = (e) =>{
        setInput(e.target.value)
    }

    const checkKey =(e)=>{
      
        const key = (e.which || e.keyCode);
        if(key === 13 && !e.shiftKey){
          if(!isMobile){
          e.preventDefault()
          sendMessage()
          setInput("")
          }
          
        }
    }

    
    
    /// resize textarea according to text
   
   
        function autoResize() {
                return tarea? tarea.scrollHeight : null
                
        }


        /// menu code ////////////////

        const handleToggle = () => {
            setOpen((prevOpen) => !prevOpen);
          };
        
        
          const handleClose = (event) => {
            if (anchorRef.current && anchorRef.current.contains(event.target)) {
              return;
            }
        
            setOpen(false);
          };
        
          function handleListKeyDown(event) {
            if (event.key === 'Tab') {
              event.preventDefault();
              setOpen(false);
            }
          }
        
          // return focus to the button when we transitioned from !open -> open
          const prevOpen = React.useRef(open);
          React.useEffect(() => {
            if (prevOpen.current === true && open === false) {
              anchorRef.current.focus();
            }
        
            prevOpen.current = open;
          }, [open]);



          const leaveRoom =()=>{
            
            if(window.confirm('Are you sure you want to leave this room?')){
            db.collection("rooms").doc(roomId).update({
              users : firebase.firestore.FieldValue.arrayRemove(user.id),
            })
            .then(()=>{
      
             
              history.push(`/`)
            }
            )
          }
          }

          const shareLink = ()=>{
              setOpenModal(true)
          }

          const enableEditing =()=>{
            setEditGroupInfo(true)
          }

          const updateRoomName = ()=>{

            db.collection("rooms").doc(roomId).update({
              name : editRoomNameInput,
            })
            .then(()=>{
      
              
              
            }
            )

          }
          const edit = ()=>{
            setEditingName(true)
            inputRef.current.focus()
          }


        const makeMessageIconsVisible = (index)=>{
          if(iconsId)
          setIconsId(null)
          else
          setIconsId(index)
        }

        const deleteMessage = (id)=>{
        
          if(window.confirm("Are you sure youwant to delete this message?")){
          db.collection("rooms").doc(roomId).collection("messages").doc(id).delete().then(() => {
          
            setIconsId(null)
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
      }
        }

        const replyMessage = (message)=>{
          if(message.isImage){
            setRepliedToMessage({
              isImage:true,
              id: message.id,
              userName : message.name,
              url:message.url
            })
          }
          else{
           setRepliedToMessage({
             id: message.id,
             userName : message.name,
             message:message.message
           })
          }
           setIconsId(null)
        }

        const gotoThatMessage =(e, id)=>{
          // e.preventDefault()
          e.stopPropagation()
          if(refs[id]){

            refs[id].current.scrollIntoView({
              behavior: 'smooth',
              block:'center'
            });
          }
        }

        const uploadImage =(e)=>{
          const types = ['image/png', 'image/jpeg']
          let selected = e.target.files[0];
       
    
        if(selected && types.includes(selected.type)) {
            setImage(selected);
          
        }
        else{
            setImage(null)
            alert('Please select an image file (png or jpeg)')
        }
        }
        const uploadRoomDP =(e)=>{
          const types = ['image/png', 'image/jpeg']
          let selected = e.target.files[0];
       
    
        if(selected && types.includes(selected.type)) {
            setRoomDP(selected);
            
        }
        else{
            alert('Please select an image file (png or jpeg)')
        }
        }

        const deleteRoomDP = ()=>{
          db.collection('rooms').doc(roomId).update({
            roomDP:null
          })
        }


    return (
      <>
        {openModal && <InviteLinkModal id={roomId} openModal={openModal} setOpenModal={setOpenModal}/>}
        <div className={classes.chat}>
            <div className={classes.chatHeader}>
                 <IconButton className={classes.menuButton}>
                        <MenuIcon onClick={()=>handleDrawerToggle(true)}/>
                    </IconButton>
                    {
                      room.roomDP ? (
                        <Avatar src={room.roomDP}/>
                      ):
                      (
                        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                      )
                    }
                <div className={classes.chatHeaderInfo} onClick={enableEditing} >
                    <h3 className={classes.chatRoomName}>{room.name}</h3>
                    {messages.length>0 &&(  <p className={classes.chatRoomLastSeen}>
                        last seen {" "}
                        {moment(new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        )).format('MMMM Do YY, h:mm a')}
                    </p>
                    )}
                </div>
                <div className={classes.chatHeaderRight}>
                   
                    
                    <IconButton
             ref={anchorRef}
             aria-controls={open ? 'menu-list-grow' : undefined}
             aria-haspopup="true"
             onClick={handleToggle}
             >
                        <MoreVertIcon/>
                    </IconButton>
            <Popper className={classes.popper}  open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                   
                    <MenuItem onClick={shareLink}>Share Invite Link</MenuItem>
                    <MenuItem onClick={leaveRoom}>Leave Room</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
                  
                    {/* <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        >
                     
                        <MenuItem onClick={handleClose}>Leave Group</MenuItem>
                        </Menu> */}
                    
                </div>
            </div>
            <div className={classes.chatBody}>

              {
                editGroupInfo? (
                    <div>
                      
                       <IconButton edge="end" style={{marginLeft:'90%'}}  onClick={()=>{
                                                                      setEditGroupInfo(false)
                                                                      setEditingName(false)
                                                                      }}>
                            <HighlightOffIcon/>
                            </IconButton>
                      
                        <div className={classes.editName}>

                          <div className={classes.roomDP} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
                         { room.roomDP ?(
                           <div style={{display:'flex', justifyContent:'center',alignItems:'center'}}>

                            <img src={room.roomDP} alt="" />
                            <form>
                              <input accept="image/*" onChange={uploadRoomDP} className={classes.imageInput} id="icon-button-dp" type="file" />
                            <label htmlFor="icon-button-dp">
                          <IconButton aria-label="upload picture" component="span"  >
                            <EditIcon/>
                            </IconButton>
                            </label>
                            </form>
                              <IconButton>
                              <DeleteIcon onClick={deleteRoomDP} />
                              </IconButton>
                           </div>
                         ):(
                           <>
                            <form>
                              <input accept="image/*" onChange={uploadRoomDP} className={classes.imageInput} id="icon-button-dp" type="file" />
                            <label htmlFor="icon-button-dp">
                          <IconButton aria-label="upload picture" component="span"  >
                            <WallpaperIcon/>
                            </IconButton>
                            </label>
                            </form>
                            <p>Upload room DP</p>
                           </>
                         )
                         }
                          </div>
                         

                          <div style={{width:'100%', display:'flex'}}>

                          <input ref={inputRef}  id="edit-room-name" type="text" value={editRoomNameInput} onChange={(e)=> setEditRoomNameInput(e.target.value)} disabled={!editingName} style={{marginTop:'20px'}}  />
                          <span >
                            {
                              editingName ? (
                                <IconButton  className={classes.editIcon} onClick={updateRoomName}>
                            <DoneIcon/>
                            </IconButton>
                              ):
                              (
                                <IconButton  className={classes.editIcon} onClick={edit}>
                            <EditIcon/>
                            </IconButton>
                              )
                            }
                          
                            </span>
                          </div>
                        </div>
                    </div>
                ) :
                ( <>
                  <div style={{display:'flex', padding:'0.5rem',color:'lightgray', flexDirection:'column', alignItems:'center', marginBottom:'20px'}}>
                   <ul>

                    <li>You can invite people into this room by sharing invite link which is in menu at chatroom header.</li>
                    <li>Click on message to reply or delete message.</li>
                    <li>Click on room name section to update room name and room DP</li>
                    <li>Scroll to the replied message by clicking on it.</li>
                   </ul>
                  </div>
                {
                messages.map((message,index) => (
                  <div 
                     ref={refs[message.id]}  key={message.id} style={{display:'flex', alignItems:'center'}}>
                   
                    <motion.div transition={{duration:'0.2'}} layout  onClick={()=>makeMessageIconsVisible(message.id)} 
                     className={`${classes.chatMessage} ${ message.userId == user?.id && classes.chatReceiver}`}>
                     
                        <div >

                        <span className={classes.chatName}>{message.name}</span>
                       { message.repliedTo && ( <div className={classes.replyMessage}  onClick={(e)=>gotoThatMessage(e,message.repliedTo.id)}>
                                <span>{message.repliedTo.userName}</span>
                                <p>{message.repliedTo.isImage? (<i>Image</i>) : message.repliedTo.message.length> 50 ?message.repliedTo.message.substring(0,50)+" ...." : message.repliedTo.message}</p>
                        </div>
                       )}
                        {message.isImage ? (
                          <img style={{width:'100%'}} src={message.url} alt="image" />
                        ) :
                        (
                          <>
                       <p style={{wordBreak:'break-all'}}> {message.message} </p>
                        <p className={classes.chatTimestamp}>{
                          moment(new Date(message.timestamp?.toDate())).format('MMMM Do YY, h:mm a')}</p>
                          </>
                          )}
                          </div>
                         
                    </motion.div>
                          { iconsId === message.id && (
                            <>
                            <IconButton size="small" onClick={()=>replyMessage(message)}>

                          <ReplyIcon  fontSize="small"/>
                          </IconButton>
                            { message.userId == user?.id &&
                              <IconButton size="small" onClick={()=>deleteMessage(message.id)} >
                                
                              <DeleteIcon fontSize="small"/>
                              </IconButton>
                              }
                            { message.isImage &&
                              <a href={message.url} target="_blank" >
                              <IconButton size="small"  >
                                
                              <CallMadeIcon fontSize="small"/>
                              </IconButton>
                              </a>
                              }
                          </>
                          )
                        }

                          </div>
                ))
                      }
                        <div ref ={scrollRef}></div>
                        </>
                )
              }
            </div>
            {
              progress>0 && <LinearProgress color="secondary" className={classes.progressBar} variant="determinate" value={progress} />
          
            }
           { repliedToMessage && <motion.div  initial={{ opacity:0}} animate={{opacity:1}} transition={{duration:0.5}}
                className={classes.repliedMessageContainer}>
              <div>
                <p>{repliedToMessage.userName}</p>
                {repliedToMessage.message ? repliedToMessage.message.length>200 ? repliedToMessage.message.substring(0,140)+" ...": repliedToMessage.message : <p><i>Image</i></p>}

              </div>
            
                <IconButton onClick={()=>setRepliedToMessage(null)} >
                            <HighlightOffIcon/>
                            </IconButton>
            </motion.div>}
            <div className={classes.chatFooter}>
            <form>
            <input accept="image/*" onChange={uploadImage} className={classes.imageInput} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
      <IconButton  aria-label="upload picture" component="span">

                <InsertPhotoIcon />
              </IconButton>
              </label>
              </form>
               
                    <textarea style={{height: `${autoResize()}px`}} rows='1' className='autoresize' role="textbox" value={input} onKeyDown={checkKey}  onChange={handleInputChange} type="text" placeholder="Type a message (Shift Enter to add new line.) "/>
                <IconButton onClick={sendMessage}>

                <SendIcon />
                </IconButton>
                    {/* <button type="submit" onClick={sendMessage}> Send a Message</button> */}
                {/* </form> */}
            </div>
            
        </div>
       </>
    )
}

export default withStyles(styles)(Chat)
