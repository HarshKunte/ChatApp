const styles = theme =>({
    container: {
        display: "flex",
        flexDirection: "column",
        height:'100vh',
        width:'100%',
    },
    header:{
        display:'flex',
        alignItems:'center',
        height:'10vh',
        backgroundColor: theme.base,
       
        padding: "0.5rem",
    },
    menuButton:{
        [theme.breakpoints.up('sm')]: {
            display: 'none',
          },
    },
    roomName:{
        color: theme.green,
        
    },
    body:{
        padding:'1rem',
        flexGrow: 1,
        display:'flex',
        flexDirection:'column',
        backgroundColor:theme.lightBase,
        justifyContent:'center',
         alignItems:'center',
         '& div':{
             '& h1':{
                fontSize: '2rem',
                marginBottom:'2rem',
                [theme.breakpoints.down('xs')]: {
                    fontSize:'1.5rem',
                   
                   },
             },
             '& h2':{
             }
         }
    },

    yesButton:{
        padding:'0.5rem 1rem',
        margin:'0.5rem',
        marginLeft:0,
        marginRight:'1rem',
        borderRadius:'15px',
        backgroundColor: theme.orange,
        color: 'white'
    },
    noButton:{
        backgroundColor: theme.base,
    }
})

export default styles