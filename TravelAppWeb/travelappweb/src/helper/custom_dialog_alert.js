import React from "react";
import {
  DialogContent,
  Dialog,
  DialogActions,
  DialogContentText,
  Button,
  TextField,
} from "@mui/material";

const textFieldStyle = {
  width: "100%",
  marginBottom: "16px",
};

const CustomDialogAlert = ({
  open,
  handleClose,
  handleAgree,
  content,
  title,
  setTitle,
  body,
  setBody,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <DialogContentText>{content}</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={textFieldStyle}
          InputLabelProps={{
            style: {
              color: "rgb(32, 94, 97)", // Label color
            },
          }}
          InputProps={{
            style: {
              borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
            },
            classes: {
              focused: {
                borderColor: "rgb(32, 94, 97)", // Border color when focused
              },
            },
          }}
        />
        <TextField
          margin="dense"
          id="body"
          label="Body"
          type="text"
          fullWidth
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={textFieldStyle}
          InputLabelProps={{
            style: {
              color: "rgb(32, 94, 97)", // Label color
            },
          }}
          InputProps={{
            style: {
              borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
            },
            classes: {
              focused: {
                borderColor: "rgb(32, 94, 97)", // Border color when focused
              },
            },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleAgree} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialogAlert;
