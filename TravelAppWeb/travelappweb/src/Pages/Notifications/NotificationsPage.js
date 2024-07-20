import NotificationsList from "./NotificationsList/NotificationsList";
import styles from "./NotificationsPage.module.css";

const NotificationsPage = () => {
  return (
    <section className={styles["notifications-section"]}>
      <header className={styles["notifications-header"]}>
        <h1>Notifications</h1>
      </header>
      <hr></hr>
      <section className={styles["notifications-content"]}>
        <NotificationsList />
      </section>
    </section>
  );
};

export default NotificationsPage;
