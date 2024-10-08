import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React, { useContext } from "react";
import CustomButton from "../../../helper/Components/CustomButton/CustomButton";
import styles from "./DenyDialog.module.css";
import { AuthLogin } from "../../../Context/login_context";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { baseUrl } from "../../../App";

const DenyDialog = ({ open = true, onClose, onDeny, announce }) => {
  const loginContext = useContext(AuthLogin);

  const denyAnnouncementRequest = async (announceId) => {
    const response = await fetch(
      `${baseUrl}/dashboard/announcement-requests/${announceId}/deny`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginContext.Token}`,
          "ngrok-skip-browser-warning": "69420",

        },
      }
    );
    const data = await response.json();
    onDeny();
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
          await denyAnnouncementRequest(announce.id);
        },
      }}
    >
      <DialogTitle className={styles["dialog-title"]}>
        Deny Announcement
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          className={styles["dialog-content"]}
          sx={{ color: "var(--text-color)" }}
        >
          Are you sure you want to deny{" "}
          <span>{announce ? announce.title : ""}</span> announcement?
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
          name="Deny"
          classes={`${styles["dialog-deny-btn"]}`}
          isSubmit
        />
      </DialogActions>
    </Dialog>
  );
};

export default DenyDialog;
