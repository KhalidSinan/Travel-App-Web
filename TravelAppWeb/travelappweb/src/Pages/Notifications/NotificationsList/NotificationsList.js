import NotificationCard from './NotificationCard/NotificationCard';
import styles from './NotificationsList.module.css';



const NotificationsList = () => {
    return (
        <ul className={styles['notifications-list']}>
            <li>
                <NotificationCard />
            </li>
            <li>
                <NotificationCard />
            </li>
            <li>
                <NotificationCard />
            </li>
            <li>
                <NotificationCard />
            </li>
        </ul>
    );
}

export default NotificationsList;