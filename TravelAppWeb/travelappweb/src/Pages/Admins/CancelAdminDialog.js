import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import styles from "./CancelAdminDialog.module.css";
import CustomButton from "../../helper/Components/CustomButton/CustomButton";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import React, { useState } from "react";
import TextFieldStyle from "../../helper/Styles/TextFieldStyle";
import AutohideSnackbar from "../../helper/snackbar";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2OThjOTc2OGE5MzJkMjRiMDZmNTMzYyIsInVzZXJuYW1lIjoiZWxvbk11c2stMjIiLCJpYXQiOjE3MjEyODk3NjZ9.Q35aHtM5xwtvC4vUBxPxcC62jzjL0OHhmmcwsgaFvBs";
const buttonStyle = {
  "&.MuiIconButton-root": {
    color: "var(--secondary-color)",
  },
};

const CancelAdminDialog = ({ open, admin, onClose, onCancelSucces }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const passwordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleShowPassword = () => setShowPassword((show) => !show);

  const restart = () => {
    setShowPassword(false);
    setPassword(null);
    setError(null);
    setIsLoading(false);
  };

  const cancelAdmin = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/dashboard/admin/${admin.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      );
      if (!response.ok) {
        const data = await response.json();
        const field = Object.keys(data.message)[0];
        throw new Error(data.message[field][0]);
      }
      restart();
      onCancelSucces();
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

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
            await cancelAdmin();
          },
        }}
      >
        <DialogTitle className={styles["dialog-title"]}>
          Cancel <span>{open ? admin.username : null}</span> Admin
        </DialogTitle>
        <DialogContent>
          <DialogContentText className={styles["dialog-content"]}>
            If you want to cancel <span>{open ? admin.username : null}</span>{" "}
            admin write your password.
          </DialogContentText>
          <FormControl
            variant="outlined"
            fullWidth
            margin="normal"
            required
            sx={TextFieldStyle}
            error={error}
          >
            <InputLabel htmlFor="admin-password">Your Password</InputLabel>
            <OutlinedInput
              id="admin-password"
              type={showPassword ? "text" : "password"}
              label="Your Password"
              value={password}
              onChange={passwordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    sx={buttonStyle}
                    aria-label="toggle password confirmation visibility"
                    onClick={toggleShowPassword}
                    edge="end"
                  >
                    {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            {error ? <FormHelperText>{error}</FormHelperText> : null}
          </FormControl>
        </DialogContent>
        <DialogActions>
          <CustomButton
            name="Back"
            primary={false}
            onClick={()=>{
              restart();
              onClose();
            }}
            classes={`${styles["dialog-back-btn"]}`}
          />
          {isLoading ? (
            <CircularProgress size={30} />
          ) : (
            <CustomButton
              name={`Cancel '${open ? admin.username : null}'`}
              classes={`${styles["dialog-cancel-btn"]}`}
              isSubmit
            />
          )}
        </DialogActions>
      </Dialog>
  );
};

export default CancelAdminDialog;
