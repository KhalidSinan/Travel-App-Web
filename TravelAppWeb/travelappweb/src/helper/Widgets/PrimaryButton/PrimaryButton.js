
import styles from './PrimaryButton.module.css';

const PrimaryButton = ({name}) => {
    return <button className={styles['primary-btn']}>
        {name}
    </button>
}

export default PrimaryButton;