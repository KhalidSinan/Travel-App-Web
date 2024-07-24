import { useCallback, useContext, useEffect, useState } from "react";
import NotificationsList from "./NotificationsList/NotificationsList";
import styles from "./NotificationsPage.module.css";
import { CircularProgress } from "@mui/material";
import CustomButton from "../../helper/Components/CustomButton/CustomButton";
import { Link } from "react-router-dom";
import { AuthLogin } from "../../Context/login_context";

const NotificationsPage = () => {
  const loginContext = useContext(AuthLogin);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/notifications/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginContext.Token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error occured while fetching notifications");
      }
      const data = await response.json();
      const notifications = [];
      for (let index in data.data) {
        const {
          id,
          notification_title: title,
          notification_body: content,
          created_at:createdAt,
        } = data.data[index];
        notifications.push({
          id,
          title,
          content,
          createdAt,
        });
      }
      notifications.reverse();
      setNotifications(notifications);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setTimeout(getAllNotifications, 2000);
  }, [getAllNotifications]);

  let content = <h2>No Notifications Found</h2>;

  if (error) {
    content = <h2>{error}</h2>;
  }

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (notifications.length > 0) {
    content = (
      <>
        <NotificationsList notifications={notifications} />
        {/* <CustomPagination count={2} page={1} onChange={() => {}} /> */}
      </>
    );
  }

  return (
    <section className={styles["notifications-section"]}>
      <header className={styles["notifications-header"]}>
        <h1>Notifications</h1>
        <Link to="/pushNotification">
        <CustomButton name="Push Notification" />
        </Link>
      </header>
      <hr></hr>
      <section className={styles["notifications-content"]}>{content}</section>
    </section>
  );
};

export default NotificationsPage;
