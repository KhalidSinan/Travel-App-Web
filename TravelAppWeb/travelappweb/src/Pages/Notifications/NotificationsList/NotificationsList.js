import NotificationCard from "./NotificationCard/NotificationCard";
import styles from "./NotificationsList.module.css";

const NotificationsList = ({notifications}) => {
  return (
    <ul className={styles["notifications-list"]}>
      {notifications.map(notification => {
        return <li key={notification.id}>
          <NotificationCard 
          title={notification.title}
          content={notification.content}
          date={new Date(notification.createdAt).toLocaleString("en-US")} />
        </li>
      })}
    </ul>
  );
};

export default NotificationsList;
