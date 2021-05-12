import React, { useState } from 'react'
import styles from './styles'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FileCopyIcon from '@material-ui/icons/FileCopy';


function InviteLinkModal({classes,openModal, setOpenModal, id}) {
 const URL = process.env.REACT_APP_URL
  const url = `${URL}/${id}`
    const [message, setMessage] = useState(null)
//   const handleOpen = () => {
//     setOpen(true);
//   };

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
   
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <div className={classes.paper}>
            <h1 id="transition-modal-title">Share this link to invite others to this room.</h1>
           <div>

            <CopyToClipboard text={url}
                                                onCopy={() => setMessage('URL Copied')}
                                                >
                                                <h4 className={classes.url} >Click to copy URL
                                                    <FileCopyIcon  />
                                                </h4>
                                            </CopyToClipboard>
                                                </div>
            <p id="transition-modal-description">{message}</p>
          </div>
        </Fade>
      </Modal>
   
  );
}

export default withStyles(styles)(InviteLinkModal)
