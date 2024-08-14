import React from "react";
import styles from "./AnnouncementCard.module.css";
import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import { BsArrow90DegDown, BsCheck, BsPerson } from "react-icons/bs";

const AnnouncementCard = ({
  title,
  content,
  date,
  organizer,
  location,
  numOfDays,
  expDate,
  price,
  options,
}) => {
  return (
    <div className={styles["announcement-card"]}>
      <header className={styles["announcement-header"]}>
        <h2>{title}</h2>
        {organizer ? (
          <span className={styles["organizer-name"]}>{organizer}</span>
        ) : null}
        {location ? <h3>Location: {location}</h3> : null}
        {price ? <h3>${price}</h3> : null}
        {numOfDays ? <h3>Show Days: {numOfDays}</h3> : null}
        {expDate ? <h3>Until: {new Date(expDate).toLocaleString("en-US")}</h3> : null}
        <h3>{new Date(date).toLocaleString("en-US")}</h3>
      </header>
      <p className={styles["announcement-content"]}>{content}</p>
      <section className={styles["announcement-options"]}>{options}</section>
    </div>
  );
};

export default AnnouncementCard;
