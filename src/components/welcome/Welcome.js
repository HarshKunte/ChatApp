import { IconButton, withStyles } from '@material-ui/core'
import React from 'react'
import styles from './styles'
import MenuIcon from '@material-ui/icons/Menu';
import { useMediaQuery } from 'react-responsive'
function Welcome({classes, mobileOpen , handleDrawerToggle}) {
    const isMobile = useMediaQuery({ query: '(max-width: 540px)' })
    return (
        <div className={classes.container}>
        <div className={classes.header}>
         <IconButton className={classes.menuButton} onClick={()=>handleDrawerToggle(true)}>
                        <MenuIcon />
                    </IconButton>
            </div>
        <div className={classes.body}>
                <div>
                <h2>Welcome to Chatz!!</h2> 
                
               {isMobile && <p> Click on menu icon to see your rooms </p> }
                <p>Click on any chat room to open chat window.</p>
                <p>You can create new rooms.</p>
                <p>You can invite other people to join your group by sharing invite link.</p>
                </div>
            </div>
        <div className={classes.header}>
            </div>
            </div>
    )
}

export default withStyles(styles)(Welcome)
