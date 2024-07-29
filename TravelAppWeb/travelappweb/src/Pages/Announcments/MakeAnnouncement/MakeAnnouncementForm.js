import React, { useContext, useState } from "react";
import CustomButton from "../../../helper/Components/CustomButton/CustomButton";
import CustomTextField from "../../../helper/Components/CustomTextField/CustomTextField";
import styles from "./MakeAnnouncementForm.module.css";
import { useNavigate } from "react-router-dom";
import { AuthLogin } from "../../../Context/login_context";

const MakeAnnouncementForm = () => {
    const loginContext = useContext(AuthLogin);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [contentTouched, setContentTouched] = useState(false);
  const navigate = useNavigate();

  const titleNotValid = title == "" && titleTouched;
  const contentNotValid = content == "" && contentTouched;

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
      "http://localhost:5000/dashboard/announcements",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${loginContext.Token}`,
        },
        body: JSON.stringify({
          title: title,
          body: content,
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
          name="Make"
          classes={styles["make-announcement-btn"]}
        />
      </form>
  );
};

export default MakeAnnouncementForm;
