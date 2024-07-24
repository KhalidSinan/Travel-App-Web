import { BsBellFill } from "react-icons/bs";
import styles from "./NotificationButton.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const NotificationButton = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(location.pathname === '/Notifications');
  }, [location]);

  const onOpenNotifications = () => {
    navigate("/Notifications");
  };

  return (
    <button
      className={`${styles["notification-btn"]} ${
        active ? styles["active"] : ""
      }`}
      onClick={onOpenNotifications}
    >
      <BsBellFill fontSize={24} />
    </button>
  );
};

export default NotificationButton;
