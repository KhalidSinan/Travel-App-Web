
import { BsBellFill } from 'react-icons/bs';
import styles from './NotificationButton.module.css';

const NotificationButton = (props) => {
  return (
    <button className={styles["notification-btn"]}>
      <BsBellFill fontSize={24} />
    </button>
  );
};

export default NotificationButton;
