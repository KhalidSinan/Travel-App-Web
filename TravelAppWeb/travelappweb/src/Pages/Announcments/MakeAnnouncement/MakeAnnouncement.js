import { Link } from "react-router-dom";
import styles from "./MakeAnnouncement.module.css";
import { BsArrowLeft } from "react-icons/bs";
import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import MakeAnnouncementForm from "./MakeAnnouncementForm";

const MakeAnnouncement = () => {
  return (
    <section className={styles["make-announcement-section"]}>
      <header className={styles["make-announcement-header"]}>
        <Link to="/Announcements">
          <CustomIconButton
            icon={<BsArrowLeft color="ffb156" fontSize={24} />}
          />
        </Link>
        <h1>Make New Announcement</h1>
      </header>
      <hr></hr>
      <section className={styles["make-announcement-body"]}>
        <MakeAnnouncementForm />
      </section>
    </section>
  );
};

export default MakeAnnouncement;
