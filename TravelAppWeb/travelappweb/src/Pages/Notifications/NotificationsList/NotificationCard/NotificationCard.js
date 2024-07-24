import styles from "./NotificationCard.module.css";

const NotificationCard = () => {
  return (
    <div
      className={`${styles["notification-card"]}`}
    >
      <header className={styles["notification-card-title"]}>
        <h2>New Update!</h2>
        <h3>2024-7-20</h3>
      </header>
      <article className={styles["notification-card-content"]}>
        Check Your trips, there is new trips going!
      </article>
    </div>
  );
};

export default NotificationCard;
