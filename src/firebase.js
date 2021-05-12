import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//GET Below Settings from Firebase > Project Overview > Settings > General > Your apps > Firebase SDK snippet > Config
const firebaseConfig = {
    // apiKey: "",
    // authDomain: "",
    // databaseURL: "",
    // projectId: "",
    // storageBucket: "",
    // messagingSenderId: "",
    // appId: "",
    // measurementId: ""
    apiKey: "AIzaSyB-TEWDyBk7hMVn4erAU4F_wJVRo3ZFwdI",
    authDomain: "whatsap-clone-6cd2c.firebaseapp.com",
    projectId: "whatsap-clone-6cd2c",
    storageBucket: "whatsap-clone-6cd2c.appspot.com",
    messagingSenderId: "755030428677",
    appId: "1:755030428677:web:24c4d629990ab791ede06c",
    measurementId: "G-L3YEVKH27J"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore(); 
  const auth = firebaseApp.auth();
  const storage = firebaseApp.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider,storage, firebaseApp};
  export default db;
