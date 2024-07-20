
import { BsBellFill } from 'react-icons/bs';
import styles from './NotificationButton.module.css';
import { useNavigate } from 'react-router-dom';

const NotificationButton = (props) => {
  const navigate = useNavigate();
  return (
    <button className={styles["notification-btn"]} onClick={() => navigate('/Notifications')}>
      <BsBellFill fontSize={24} />
    </button>
  );
};

export default NotificationButton;
