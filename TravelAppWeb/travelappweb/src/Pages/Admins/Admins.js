import { BsSearch } from 'react-icons/bs';
import CustomIconButton from '../../helper/Components/IconButton/CustomIconButton';
import styles from './Admins.module.css';
import PrimaryButton from '../../helper/Components/PrimaryButton/PrimaryButton';
import AdminsList from './AdminsList';

const Admins = _ => {
    return (
        <section className={styles['admins-section']}>
            <header className={styles['admins-header']}>
                <h1>Admins</h1>
                <div className={styles['admins-header-actions']}>
                    <PrimaryButton name="Add Admin" />
                    <CustomIconButton 
                    icon={<BsSearch color='#ffb156' fontSize={32} />}  
                    />
                </div>
            </header>
            <hr></hr>
            <section className={styles['admins-list']}>
                <AdminsList />
            </section>
        </section>
    );
}

export default Admins;