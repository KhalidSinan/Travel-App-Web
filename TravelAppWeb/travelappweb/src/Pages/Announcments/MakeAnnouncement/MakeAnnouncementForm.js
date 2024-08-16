import React, { useContext, useState } from "react";
import CustomButton from "../../../helper/Components/CustomButton/CustomButton";
import CustomTextField from "../../../helper/Components/CustomTextField/CustomTextField";
import styles from "./MakeAnnouncementForm.module.css";
import { useNavigate } from "react-router-dom";
import { AuthLogin } from "../../../Context/login_context";
import {
  DateField,
  DatePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import TextFieldStyle from "../../../helper/Styles/TextFieldStyle";
import { TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import { baseUrl } from "../../../App";
const MakeAnnouncementForm = () => {
  const loginContext = useContext(AuthLogin);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [titleTouched, setTitleTouched] = useState(false);
  const [contentTouched, setContentTouched] = useState(false);
  const [expiryDateTouched, setExpiryDateTouched] = useState(false);
  const navigate = useNavigate();
  const currentDate = new Date();
  const titleNotValid = title == "" && titleTouched;
  const contentNotValid = content == "" && contentTouched;
  const expiryDateNotValid = expiryDate == null && expiryDateTouched;

  const changeTitle = (event) => {
    setTitleTouched(true);
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContentTouched(true);
    setContent(event.target.value);
  };

  const changeExpiryDate = (date) => {
    setExpiryDateTouched(true);
    if(date && currentDate.getTime() > date.getTime()){
      setExpiryDate(currentDate);
      return;
    }
    setExpiryDate(date);
  }
 
  const makeAnnouncement = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `${baseUrl}/dashboard/announcements`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginContext.Token}`,
          "ngrok-skip-browser-warning": "69420",

        },
        body: JSON.stringify({
          title: title,
          body: content,
          expiry_date: format(expiryDate, "dd/MM/yyyy")
        }),
      }
    );
    const data = await response.json();
    console.log(data);
    navigate("/Announcements");
  };
  

  return (
    <form
      className={styles["make-announcement-fields"]}
      onSubmit={makeAnnouncement}
    >
      <CustomTextField
        label="Title"
        id="notification_title"
        onChange={changeTitle}
        value={title}
        error={titleNotValid}
        errText="Title Field must not be empty"
      />
      <CustomTextField
        label="Content"
        id="notification_content"
        onChange={changeContent}
        value={content}
        error={contentNotValid}
        errText="Content Field must not be empty"
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Expiry Date"
          value={expiryDate}
          onChange={changeExpiryDate}
          sx={TextFieldStyle}
          renderInput={(params) => (
            <TextField {...params} 
            required
            variant="Standard" 
            error={expiryDateNotValid}
            errText="Expiry Date Field must not be empty"
            fullWidth />
          )}
        />
      </LocalizationProvider>
      <CustomButton
        isSubmit={true}
        name="Make"
        classes={styles["make-announcement-btn"]}
      />
    </form>
  );
};

export default MakeAnnouncementForm;
