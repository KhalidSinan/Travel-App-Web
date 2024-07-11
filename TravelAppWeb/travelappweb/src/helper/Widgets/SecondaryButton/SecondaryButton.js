
import styles from './SecondaryButton.module.css';

const SecondaryButton = ({name}) => {
    return <button className={styles['secondary-btn']}>
        {name}
    </button>
}

export default SecondaryButton;