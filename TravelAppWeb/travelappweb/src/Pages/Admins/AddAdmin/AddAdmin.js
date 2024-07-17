import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import styles from "./AddAdmins.module.css";
import AddAdminForm from "./AddAdminForm";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
const AddAdmin = (props) => {
  return (
    <section className={styles["add-admin-section"]}>
      <header className={styles["add-admin-header"]}>
        <Link to='/admins'>
            <CustomIconButton icon={<BsArrowLeft color="ffb156" fontSize={24} />} />
        </Link>
        <h1>Add Admin</h1>
      </header>
      <hr></hr>
      <section className={styles['add-admin-body']}>
      <AddAdminForm />
      </section>
    </section>
  );
};

export default AddAdmin;
