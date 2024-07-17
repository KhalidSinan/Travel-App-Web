
import React from "react";
import {
  DialogContent,
  Dialog,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";

const CustomDialog = ({ open, handleClose, content,handelAgree }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handelAgree} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
