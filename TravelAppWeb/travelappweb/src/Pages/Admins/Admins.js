import styles from "./Admins.module.css";
import CustomButton from "../../helper/Components/CustomButton/CustomButton.js";
import AdminsList from "./AdminsList";
import { Link } from "react-router-dom";
import SearchBar from "../../helper/Components/SearchBar/SearchBar.js";
const Admins = (_) => {
  return (
    <section className={styles["admins-section"]}>
      <header className={styles["admins-header"]}>
        <h1>Admins</h1>
        <div className={styles["admins-header-actions"]}>
          <Link to="/addAdmin">
            <CustomButton name="Add Admin" />
          </Link>
          {/* <CustomIconButton icon={<BsSearch color="#ffb156" fontSize={32} />} /> */}
          <SearchBar />
        </div>
      </header>
      <hr></hr>
      <section className={styles["admins-list"]}>
        <AdminsList />
      </section>
    </section>
  );
};

export default Admins;
