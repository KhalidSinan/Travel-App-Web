


import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useContext } from 'react'
import CustomButton from '../CustomButton/CustomButton';
import styles from './LogoutDialog.module.css';
import { AuthLogin } from '../../../Context/login_context';

const LogoutDialog = ({open, onClose}) => {
    const {logoutHandler} = useContext(AuthLogin);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        style: {
          backgroundColor: "var(--background)",
          color: "var(--text-color)",
        },
        onSubmit: async (event) => {
          event.preventDefault();
          await logoutHandler(event);
          onClose();
        },
      }}
    >
      <DialogTitle className={styles["dialog-title"]}>
        Logout
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className={styles["dialog-content"]}
          sx={{ color: "var(--text-color)" }}
        >
          Are you sure you want to logout?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CustomButton
          name="Back"
          primary={false}
          onClick={() => {
            onClose();
          }}
          classes={`${styles["dialog-back-btn"]}`}
        />
        <CustomButton
          name="Logout"
          classes={`${styles["dialog-accept-btn"]}`}
          isSubmit
        />
      </DialogActions>
    </Dialog>
    );
}

export default LogoutDialog