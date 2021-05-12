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
    body:{
        padding:'1rem',
        flexGrow: 1,
        display:'flex',
        flexDirection:'column',
        backgroundColor:theme.lightBase,
        justifyContent:'center',
         alignItems:'center',
         '& div':{
             '& h2':{
                 marginBottom:'2rem'
             }
         }
    }
})

export default styles