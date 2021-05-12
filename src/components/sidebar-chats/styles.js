 const styles = theme =>({
     container:{
        padding:'0.5rem 1rem',
         cursor: "pointer",
         [theme.breakpoints.down('xs')]: {
            padding:'0.5rem'
          },
     },
    sidebarChat:{
        // backgroundColor: theme.lightBase,
        // borderRadius: '20%',
        // borderBottom:' 1px solid #f8f6f6',
        display: "flex",
        padding: "20px",
        [theme.breakpoints.down('xs')]: {
            padding:'0.5rem'
          },
        [theme.breakpoints.down('sm')]: {
            padding:'0.5rem'
          },
    //    borderRadius: '50px 50px'
    },
    
    // sidebarChat:hover{
    //     background-color: #d4d3d3,
    // }
    
    
    
    sidebarChatInfo :{
        marginLeft: "15px",
        flexGrow: 1,
        [theme.breakpoints.down('xs')]: {
            marginLeft: '0.5rem',
          },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '0.5rem',
          },
       '& h2': {
        fontSize: "16px",
        color:'white',
        margin: "0px",
        },
        "& p":{
            margin: "0px",
        }
    },
    addNewChatTitle:{
        margin: "0px 0px 0px 10px",
    },
    
   
})

export default styles