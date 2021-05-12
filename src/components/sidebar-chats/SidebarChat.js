import React, {useEffect, useState} from 'react';
import {Avatar, Divider, withStyles} from "@material-ui/core";
import firebase from 'firebase'
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import moment from 'moment'
import {Link, useHistory} from 'react-router-dom';
import styles from './styles';
import {motion} from 'framer-motion'


function SidebarChat({id,room, closeDrawer, classes}) {
    const [seed, setSeed] = useState("");
    const [messages, setMessages] = useState("");
    const [{user},dispatch] = useStateValue();
    const history = useHistory()
    useEffect(() => {
        if(id){
            db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map((doc) => doc.data()))
            })
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));        
    }, []);

    const openChat =()=>{
        history.push(`/rooms/${id}`)
        closeDrawer()
    }
   
    return  (
        // <Link to={`/rooms/${id}`} key={id} onClick={closeDrawer}>
            <motion.div layout className={classes.container} onClick={openChat}>
            <div className={classes.sidebarChat}>
                {
                    room.roomDP? (
                        <Avatar src={room.roomDP}/>
                    ):(

                        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                    )
                }
                <div className={classes.sidebarChatInfo}>
                    <h2>{room.name}</h2>
                    {
                        messages && messages[0]?.isImage? (
                            <p><i>Image</i></p>
                        ):(

                            <p>{messages[0]?.message.length>40? messages[0]?.message.substring(0,40)+".." : messages[0]?.message}</p>
                        )
                    }
                </div>
            </div>
                <Divider />  
            </motion.div>
        // </Link>
        
    ) 
}

export default withStyles(styles)(SidebarChat)
