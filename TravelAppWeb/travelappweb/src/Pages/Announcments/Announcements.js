import { Link } from "react-router-dom";
import CustomButton from "../../helper/Components/CustomButton/CustomButton";
import Tabs from "../../helper/tabs";
import styles from "./Announcements.module.css";
import AnnouncementsRequests from "./AnnouncementsRequests/AnnouncementsRequests";
import AppAnnouncements from "./AppAnnouncements/AppAnnouncements";
import OrganizersAnnouncements from "./OrganizersAnnouncements/OrganizersAnnouncements";

const Announcements = () => {
  return (
    <section className={styles["announcements-section"]}>
      <header className={styles["announcements-header"]}>
        <h1>Announcements</h1>
        <Link to="/makeAnnouncement">
        <CustomButton name="Make Announcement" />
        </Link>
      </header>
      <section className={styles["announcements-content"]}>
        <Tabs
          tab1="From App"
          tab2="From Organizers"
          tab3="Requests"
          component1={<AppAnnouncements />}
          component2={<OrganizersAnnouncements />}
          component3={<AnnouncementsRequests />}
        />
      </section>
    </section>
  );
};

export default Announcements;
