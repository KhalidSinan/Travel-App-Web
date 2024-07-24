import React from "react";
import styles from "./AnnouncementCard.module.css";
import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import { BsArrow90DegDown, BsCheck, BsPerson } from "react-icons/bs";

const AnnouncementCard = ({title,content, date,organizer,options}) => {
  return (
    <div className={styles["announcement-card"]}>
      <header className={styles["announcement-header"]}>
        <h2>{title}</h2>
        {organizer ? <span className={styles['organizer-name']}>{organizer}</span> : null}
        <h3>{new Date(date).toLocaleString("en-US")}</h3>
      </header>
      <p className={styles["announcement-content"]}>{content}</p>
      <section className={styles["announcement-options"]}>
        {options}
      </section>
    </div>
  );
};

export default AnnouncementCard;
