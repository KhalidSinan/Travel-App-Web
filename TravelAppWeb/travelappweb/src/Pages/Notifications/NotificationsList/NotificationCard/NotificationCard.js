import styles from "./NotificationCard.module.css";

const NotificationCard = ({ title, content, date}) => {
  return (
    <div
      className={`${styles["notification-card"]}`}
    >
      <header className={styles["notification-card-title"]}>
        <h2>{title}</h2>
        <h3>{date}</h3>
      </header>
      <article className={styles["notification-card-content"]}>
        {content}
      </article>
    </div>
  );
};

export default NotificationCard;
