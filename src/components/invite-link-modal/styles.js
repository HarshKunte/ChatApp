const styles = theme =>({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        
      },
      paper: {
        backgroundColor: theme.base,
        maxWidth:'80%',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        borderRadius:'30px',
        textAlign:'center',
        // margin:'1rem',
        "& h1":{
            
            color:theme.green,
            marginBottom: '1rem',
        },

        "& h4":{
            margin: "0.5rem 0",
    
        }
      },

      url:{
          backgroundColor:theme.lightBase,
          padding:'0.2rem',
          borderRadius:'10px',
          display:'flex',
          alignItems:'center',
          justifyContent :'center',
          cursor:'pointer',
          overflow:'hidden'
      }
})

export default styles