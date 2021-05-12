const styles = theme =>({
    login:{
        backgroundColor: theme.base,
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems:'center'
    },
    
    loginContainer:{
        width:'30%',
        padding: "5rem",
        textAlign: "center",
        backgroundColor: theme.lightBase,
        borderRadius: "10px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 012), 0 1px",
        "& img":{
            objectFit: "contain",
        width: "100%",
        marginBottom: "40px",
        },
        "& button":{
            marginTop: "50px",
            width:'100%',
        textTransform: "inherit !important",
        backgroundColor: theme.base,
        color: "white",
        },
        [theme.breakpoints.down('md')]: {
            width:'50%',
           padding: '2rem'
           },
        [theme.breakpoints.down('xs')]: {
            width:'70%',
           padding: '2rem'
           },
    },

    loginText:{
        color:'white'
    }
    
   
    
 
})

export default styles