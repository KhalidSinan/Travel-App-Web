import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useContext } from "react";
import CustomButton from "../../../helper/Components/CustomButton/CustomButton";
import styles from "./AcceptDialog.module.css";
import { AuthLogin } from "../../../Context/login_context";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { baseUrl } from "../../../App";

const AcceptDialog = ({ open = true, onClose, onAccept, announce }) => {
    const loginContext = useContext(AuthLogin);

  const acceptAnnouncementRequest = async (announceId) => {
    const response = await fetch(
      `${baseUrl}/dashboard/announcement-requests/${announceId}/accept`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginContext.Token}`,
        },
      }
    );
    const data = await response.json();
    console.log(data.message);
    onAccept();
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
          await acceptAnnouncementRequest(announce.id)
        },
      }}
    >
      <DialogTitle className={styles["dialog-title"]}>
        Accept Announcement
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className={styles["dialog-content"]}
          sx={{ color: "var(--text-color)" }}
        >
          Are you sure you want to accept <span>{announce ? announce.title : ''}</span> announcement?
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
          name="Accept"
          classes={`${styles["dialog-accept-btn"]}`}
          isSubmit
        />
      </DialogActions>
    </Dialog>
  );
};

export default AcceptDialog;
