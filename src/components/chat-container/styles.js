import Image from '../../images/chatbg.png'
const styles =theme =>({
   
    chat :{
        // flex: 0.65,
        display: "flex",
        flexDirection: "column",
        height:'100vh',
        width:'100%',
        // marginTop:'10vh'
    },
    
    chatRoomName:{
        margin: "0px",
    },
    
    chatRoomLastSeen:{
        margin: 0,
        fontSize: 'small',
        color: 'wheat',
        [theme.breakpoints.down('xs')]: {
           fontSize:'x-small',
          },
    },
    
    chatHeader:{
        display: "flex",
        padding: "1rem",
        alignItems: "center",
        backgroundColor:theme.base,
       
        // borderBottom: "1px solid lightgray",
        [theme.breakpoints.down('xs')]: {
            // flexWrap:'wrap'
          },
    },
    
    chatHeaderInfo:{
        flex: 1,
        paddingLeft: "20px",
        cursor:'pointer',
       
        "& h3":{
            marginBottom: "3px",
            fontWeight: 500,
        },
        
    },
    menuButton: {
       
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
    
    chatHeaderRight:{
        display: "flex",
        justifyContent: "space-around",
        [theme.breakpoints.up('sm')]: {
           
            minWidth: "100px",
          },
        [theme.breakpoints.down('xs')]: {
           
            // flexBasis:'100%'
          },
    },
    
    chatBody:{
        flex: 1,
        backgroundColor:theme.lightBase,
        // backgroundImage: `url(${Image})`,
        backgroundRepeat: "repeat",
        backgroundPosition: "center",
        padding: "1.8rem",
        overflowY:"scroll",
        [theme.breakpoints.down('xs')]: {
            padding: '1rem',
          },
    },
    
    chatMessage:{
        position: "relative",
        fontSize: "16px",
        borderRadius: "1rem",
        padding: "1rem",
        backgroundColor: theme.base,
        maxWidth:'60%',
        marginBottom: '30px',
        cursor:'pointer',
        display:'flex',
        whiteSpace:'pre-line',
        [theme.breakpoints.down('xs')]: {
            padding: '0.8rem',
          },
    },
    
    chatName:{
        position: "absolute",
        top:"-15px",
        fontWeight: 800,
        fontSize: "xx-small",
        
    },
    
    chatTimestamp:{
        marginLeft: "auto",
        fontSize: "xx-small",
      
    },
    
    chatReceiver:{
        marginLeft: "auto",
        backgroundColor: theme.orange,
    },
    
    chatFooter:{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding:'1rem 0.5rem',
        // height: "62px",
        // border: "1px solid lightgray",
        // "& form":{
        //     flex: 1,
        //     display: "flex",
            "& textarea":{
                flex: 1,
                borderRadius: "30px",
                padding: "1rem",
                border: "none",
                margin:" 0 10px 0px 10px",
                outline:'none',
                resize:'none',
                maxHeight: "300px",
                [theme.breakpoints.down('xs')]: {
                    maxHeight: '200px',
                  },
                
            },
      
    },

    popperMenu:{
        zIndex: 2,
       
    },
    popper:{
        // transform: 'translateX(-50%)',
        zIndex:2,
        marginRight:'20px',
        [theme.breakpoints.down('xs')]: {
            marginRight:'30px',
          },
    },

    editName:{
        padding:'1rem',
        "& h1":{
            marginBottom:'10px',
            marginLeft:'5px'
        },
        "& input":{
            padding:'1rem',
            background : theme.base,
            width:'60%',
            border:'none',
            outline:'none',
            fontSize:'1.3rem',
            borderRadius: '25px',
            color: 'lightgrey',
            "&:focus":{
                color: theme.green
            },
            [theme.breakpoints.down('xs')]: {
                
                flexGrow:1,
                padding:'1rem',
                fontSize:'1rem',
                borderRadius: '25px',
              },
        },

        [theme.breakpoints.down('xs')]: {
           padding:'0.5rem'
          },
    },
    
   editIcon:{
       backgroundColor:theme.green,
       marginLeft:'10px',
       [theme.breakpoints.down('xs')]: {
        fontSize:'1rem',

       },
      
   },
   repliedMessageContainer:{
       display:'flex',
       alignItems:'center',
       padding:'0.5rem',
       paddingBottom:0,
       "& div":{
           padding:'0.5rem',
           flexGrow:1,
           backgroundColor: theme.lightBase,
           borderRadius:'10px',
          '& p':{
              color: theme.green
          }
       }
   },

   replyMessage:{
       backgroundColor: theme.lightBase,
       borderRadius:'10px',
       padding:'0.2rem 0.3rem',
       marginBottom:'5px',
       "& span":{
           fontSize:"xx-small",
           color: theme.green
       },
       "& p":{
           fontSize:"x-small"
       }
   },

   imageInput:{
       display:'none'
   },

   roomDP:{
       "& img":{
           width:'300px',
           height:'300px',
           borderRadius:'50%',
           objectFit:'cover',
           [theme.breakpoints.down('xs')]: {
            width:'200px',
           height:'200px',
           },
       }
   },

  
    
   

}

)

export default styles
