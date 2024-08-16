import React, { useContext, useState } from "react";
import CustomButton from "../../../helper/Components/CustomButton/CustomButton";
import CustomTextField from "../../../helper/Components/CustomTextField/CustomTextField";
import styles from "./PushNotificationForm.module.css";
// import AutohideSnackbar from "../../../helper/snackbar";
import { useNavigate } from "react-router-dom";
import { AuthLogin } from "../../../Context/login_context";
import { baseUrl } from "../../../App";

const PushNotificationForm = () => {
    const loginContext = useContext(AuthLogin);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [contentTouched, setContentTouched] = useState(false);
  const navigate = useNavigate();

  const titleNotValid = title === "" && titleTouched;
  const contentNotValid = content === "" && contentTouched;

  const changeTitle = (event) => {
    setTitleTouched(true);
    setTitle(event.target.value);
  };

  const changeContent = (event) => {
    setContentTouched(true);
    setContent(event.target.value);
  };

  const pushNotification = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `${baseUrl}/dashboard/notifications/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginContext.Token}`,
          "ngrok-skip-browser-warning": "69420",

        },
        body: JSON.stringify({
          notification_title: title,
          notification_body: content,
        }),
      }
    );
    const data = await response.json();
    navigate("/Notifications");
  };

  return (
      <form
        className={styles["push-notification-fields"]}
        onSubmit={pushNotification}
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
        <CustomButton
          isSubmit={true}
          name="Push"
          classes={styles["push-notification-btn"]}
        />
      </form>
  );
};

export default PushNotificationForm;
