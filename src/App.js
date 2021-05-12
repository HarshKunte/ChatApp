import './App.css';
import React, {useEffect, useState} from 'react';
import {useStateValue} from './StateProvider';
import Home from './components/home/Home';
import { actionTypes } from './reducer';

import { firebaseApp } from './firebase';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { BrowserRouter as Router,Switch, Route} from 'react-router-dom';


import Login from './components/login/Login'
const theme = createMuiTheme({
//  base:'#3f3653'
palette: {
  type: 'dark',
},
 base:'#4d426d',
 lightBase: '#6b5d96',
 orange: "#f5a279",
 green :"#3cc6b7"
});

function App() {

  const [{user}, dispatch] = useStateValue();
  

  useEffect(() => {
    // console.log(auth.currentUser)
    firebaseApp.auth().onAuthStateChanged(async (user) => {
      if(user){       
        dispatch({
          type: actionTypes.SET_USER,
          user: {name:user.displayName
              , photo:user.photoURL, 
              id:user.uid},
      })
  }
      else{
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
      })
  }
    
    })
  }, [])


  return (
    <div className="app">
       <div className="app_body">
        <ThemeProvider theme={theme}>
     
      <Router>

        {!user ? (
          <Login />
          ):(
            <Switch>
            <Route path="/" >
            <Home />
              </Route>  
           
            </Switch>
            )}
            </Router>
        
            </ThemeProvider>
            </div>
    </div>
  );
}

export default App;
