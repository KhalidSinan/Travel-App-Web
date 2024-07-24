import { Link } from "react-router-dom";
import styles from "./PushNotification.module.css";
import { BsArrowLeft } from "react-icons/bs";
import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import PushNotificationForm from "./PushNotificationForm";

const PushNotification = () => {
  return (
    <section className={styles["push-notification-section"]}>
      <header className={styles["push-notification-header"]}>
        <Link to="/Notifications">
          <CustomIconButton
            icon={<BsArrowLeft color="ffb156" fontSize={24} />}
          />
        </Link>
        <h1>Push New Notification</h1>
      </header>
      <hr></hr>
      <section className={styles["push-notification-body"]}>
        <PushNotificationForm />
      </section>
    </section>
  );
};

export default PushNotification;
