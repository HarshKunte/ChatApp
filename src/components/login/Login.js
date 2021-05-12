import { Button, withStyles } from '@material-ui/core';
import React from 'react';

import db, {auth,provider} from '../../firebase';
import { actionTypes } from '../../reducer';
import { useStateValue } from '../../StateProvider';
import chatlogo from '../../images/chatlogo.svg'
import styles from './styles';

function Login({classes}) {
    const [{},dispatch] = useStateValue();
    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {

                const user = result.user
                const docref = db.collection('users').doc(user.uid)
                
                db.runTransaction(transaction => {
                    return transaction.get(docref).then((doc) => {
                        if (!doc.exists) {
                            db.collection('users').doc(user.uid).set({
                                name: user.displayName,
                                id: user.uid,
                                photo: user.photoURL
                            }).then(() => {
                                dispatch({
                                    type: actionTypes.SET_USER,
                                    user: {name:result.user.displayName
                                        , photo:result.user.photoURL, 
                                        id:result.user.uid},
                                })
                                console.log('done');
                                // toast('Login successfull!', {
                                //     type: 'success'
                                // })
                            })
                                .catch((e) => {
                                    console.log(e);
                                    // toast('Something went wrong', { type: 'error' })
                                })
                        }
                    }).catch(e => {
                        console.log(e);
                        // toast('Something went wrong', { type: 'error' })
                    })

              
            })
            .catch((error) => alert(error.message));
        })
    }
    return (
        <div className={classes.login}>
           <div className={classes.loginContainer}>
               <img src={chatlogo} alt=""/> 
                <div className={classes.loginText}>
                    <h1>Welcome to Chatz</h1>
                </div>
                <Button type="submit" onClick={signIn}>Sign in With Google</Button>
                <h5>made by Harsh Kunte</h5>
           </div>
        </div>
    );
}

export default withStyles(styles)(Login)
