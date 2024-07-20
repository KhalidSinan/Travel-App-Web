import styles from "./NotificationCard.module.css";

const NotificationCard = ({ seen }) => {
  return (
    <div
      className={`${styles["notification-card"]} ${seen ? styles["seen"] : ""}`}
    >
      <header className={styles["notification-card-title"]}>
        <h2>New Update!</h2>
        <h3>2024-7-20</h3>
      </header>
      <article className={styles["notification-card-content"]}>
        Pellentesque habitant morbi tristique senectus et netus et malesuada
        fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae,
        ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam
        egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend
        leo.
      </article>
    </div>
  );
};

export default NotificationCard;
