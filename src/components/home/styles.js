const drawerWidth = '30vw';
const styles = theme =>({
    root: {
        display: 'flex',
      },
      drawer: {
        
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
       
       
      },
     
      menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      // necessary for content to be below app bar
      toolbar: {
        display:'flex',
        alignItems:'center',
        padding:'1rem',
        height:'10vh'
      },
      appName:{
        flexGrow:1,
        padding: '0 0.5rem'
      },
      drawerPaper: {
        width: drawerWidth,
        backgroundColor:theme.base,
        // backgroundColor:theme.base,
        [theme.breakpoints.down('xs')]: {
          width: '80vw',
        },
      },
      content: {
        
        flexGrow: 1,
        width:'100%',
        
        minHeight:'100vh',
        backgroundColor:theme.base,
        // padding: theme.spacing(3),
       
      },
      roomList:{
        margin:'1rem',
        borderRadius:'2rem',
        backgroundColor:theme.lightBase,
        [theme.breakpoints.down('xs')]: {
          borderRadius: '1.2rem',
        },
        [theme.breakpoints.down('sm')]: {
          margin: '0.5rem',
        },
      },
      listButtons:{
        justifyContent:'center',
        
      },
      button:{
        backgroundColor: theme.lightBase,
        width:'100%',
        height:'6vh',
        color: 'white',
        borderRadius: '25px',
        '&:hover':{
          backgroundColor: theme.lightBase,
        }
      },
      createRoomForm:{
       
        '& input':{
          backgroundColor: theme.base,
          color: 'white',
          marginRight:'0.5rem',
          flexGrow:1,
          padding:'0.7rem',
          border:'none',
          borderBottom:'1px solid black',
          "&::placeholder":{
            color:'white'
          }
        }
      }
    })

    export default styles