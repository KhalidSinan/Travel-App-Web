import { Link } from "react-router-dom";
import CustomButton from "../../helper/Components/CustomButton/CustomButton";
import Tabs from "../../helper/tabs";
import styles from "./Announcements.module.css";
import AnnouncementsRequests from "./AnnouncementsRequests/AnnouncementsRequests";
import AppAnnouncements from "./AppAnnouncements/AppAnnouncements";
import OrganizersAnnouncements from "./OrganizersAnnouncements/OrganizersAnnouncements";
import AppAnnouncementsContextProvider from "../../Context/app_announcements_context";
import OrganizersAnnouncementsContextProvider from "../../Context/organizers_announcements_context";
import AnnouncementsRequestsContextProvider from "../../Context/announcements_requests_context";

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
          component1={
            <AppAnnouncementsContextProvider>
              <AppAnnouncements />
            </AppAnnouncementsContextProvider>
          }
          component2={
            <OrganizersAnnouncementsContextProvider>
              <OrganizersAnnouncements />
            </OrganizersAnnouncementsContextProvider>
          }
          component3={
            <AnnouncementsRequestsContextProvider>
              <AnnouncementsRequests />
            </AnnouncementsRequestsContextProvider>
          }
        />
      </section>
    </section>
  );
};

export default Announcements;
