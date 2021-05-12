import React, {useState,useEffect} from 'react'
import db,{storage} from '../firebase'
import firebase from 'firebase'
const useStorage = (file,user,roomId, repliedTo, roomDP) =>{
    const [progress, setProgress] = useState(0);
    const [error, setError] = useState(null);
    const [url, setUrl] =useState(null);



useEffect(()=>{
    if(file){
    const storageRef = storage.ref(file.name)
    const dbRef = db.collection('rooms').doc(roomId).collection('messages');
    storageRef.put(file).on('state_changed', (snap)=>{
        let percentage = (snap.bytesTransferred/ snap.totalBytes) *100
        setProgress(percentage)
    }, (err)=> setError(err) ,async ()=>{
        const url = await storageRef.getDownloadURL()
        const timestamp = firebase.firestore.FieldValue.serverTimestamp();
        const name = user.name; 
        const isImage = true
        const userId = user.id
        if(repliedTo)
        dbRef.add({url,timestamp, name, isImage, userId, repliedTo})
        else
        dbRef.add({url,timestamp, name, isImage, userId}).then(()=>{
            
            setProgress(0)
        })

        setUrl(url)
    })
}

   

},[file])





useEffect(() => {
    if(roomDP){
        const storageRef = storage.ref(roomDP.name)
        const dbRef = db.collection('rooms').doc(roomId);
        storageRef.put(roomDP).on('state_changed', (snap)=>{
            let percentage = (snap.bytesTransferred/ snap.totalBytes) *100
        }, (err)=> setError(err) ,async ()=>{
            const roomDP = await storageRef.getDownloadURL()      
            dbRef.update({roomDP: roomDP})
        })
    }
    
}, [roomDP])

return {progress, url, error}
}
export default useStorage; 