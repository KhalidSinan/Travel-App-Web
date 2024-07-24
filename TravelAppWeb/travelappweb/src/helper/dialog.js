
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
        <Button onClick={handleClose} sx={{ color: "var(--primary-color)" }}>
          Disagree
        </Button>
        <Button onClick={handelAgree} sx={{ color: "var(--primary-color)" }}autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
