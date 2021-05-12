import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//GET Below Settings from Firebase > Project Overview > Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN ,
  projectId:  process.env.REACT_APP_PROJECT_ID,
  storageBucket:  process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId:  process.env.REACT_APP_MEASUREMENT_ID
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const storage = firebaseApp.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider,storage, firebaseApp};
  export default db;
