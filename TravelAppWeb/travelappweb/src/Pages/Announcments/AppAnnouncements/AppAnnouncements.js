import { useCallback, useContext, useEffect, useState } from "react";
import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";
import styles from "./AppAnnouncements.module.css";
import { AuthLogin } from "../../../Context/login_context";
import { CircularProgress } from "@mui/material";
import { AppAnnouncementsContext } from "../../../Context/app_announcements_context";
import CustomPagination from "../../../helper/custom_pagination";
import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import { BsFilter, BsSortDown, BsSortUp } from "react-icons/bs";
import AnnouncemenetsFilter from "../AnnouncementsFilter/AnnouncementsFilter";

const AppAnnouncements = () => {
  const {
    announcements,
    getAllAppAnnouncements,
    changePage,
    toggleSort,
    isLoading,
    error,
    page,
    count,
    sort,
  } = useContext(AppAnnouncementsContext);
  const [showFilter, setShowFilter] = useState(false);

  const toggleShowFilter = () => setShowFilter((prev) => !prev);

  useEffect(() => {
    getAllAppAnnouncements();
  }, [getAllAppAnnouncements]);

  let content = <h2>No Announcements Found</h2>;

  if (error) {
    content = <h2>{error}</h2>;
  }

  if (isLoading) {
    content = (
      <div className={styles.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (announcements.length > 0 && !isLoading) {
    content = (
      <>
        <ul className={styles["announcements-list"]}>
          {announcements.map((announce, index) => {
            return (
              <li key={index}>
                <AnnouncementCard
                  key={announce.announcement_title}
                  title={announce.announcement_title}
                  content={announce.announcement_body}
                  expDate={announce.expiry_date}
                  date={announce.created_at}
                />
              </li>
            );
          })}
        </ul>
        {Math.ceil(count / 10) > 1 ? (
          <CustomPagination
            count={Math.ceil(count / 10)}
            page={page}
            onChange={(event, page) => changePage(event, page)}
          />
        ) : null}
      </>
    );
  }

  return <>
  <div className={styles["announcements-options"]}>
        <CustomIconButton
          icon={<BsFilter />}
          text="Filter"
          classes={`${showFilter ? styles["filter-active"] : ""} ${
            styles["option-btn"]
          }`}
          onClick={toggleShowFilter}
        />
        <CustomIconButton
          icon={sort === "desc" ? <BsSortUp /> : <BsSortDown />}
          text="Sort"
          onClick={toggleSort}
          classes={`${styles["option-btn"]}`}
        />
      </div>
      {showFilter ? (
        <AnnouncemenetsFilter
          showFilter={showFilter}
          context={AppAnnouncementsContext}
        />
      ) : null}
  {content}
  </>;
};

export default AppAnnouncements;
