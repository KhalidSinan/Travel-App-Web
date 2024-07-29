import {
  BsArrow90DegDown,
  BsCheck,
  BsFilter,
  BsPerson,
  BsPersonLinesFill,
  BsSortDown,
  BsSortUp,
} from "react-icons/bs";
import CustomButton from "../../../helper/Components/CustomButton/CustomButton";
import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";
import styles from "./OrganizersAnnouncements.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthLogin } from "../../../Context/login_context";
import { CircularProgress } from "@mui/material";
import OrganizersContext from "../../../Context/organizers_context";
import { useNavigate } from "react-router-dom";
import { AnnouncementsContext } from "../../../Context/app_announcements_context";
import CustomPagination from "../../../helper/custom_pagination";
import { OrganizersAnnouncementsContext } from "../../../Context/organizers_announcements_context";
import AnnouncemenetsFilter from "../AnnouncementsFilter/AnnouncementsFilter";

const OrganizersAnnouncements = () => {
  const {
    announcements,
    getAllOrganizersAnnouncements,
    changePage,
    toggleSort,
    isLoading,
    error,
    page,
    count,
    sort,
  } = useContext(OrganizersAnnouncementsContext);
  const [showFilter, setShowFilter] = useState(false);

  const toggleShowFilter = () => setShowFilter((prev) => !prev);

  useEffect(() => {
    getAllOrganizersAnnouncements();
  }, [getAllOrganizersAnnouncements]);

  const { fetchOrganizerDetails } = useContext(OrganizersContext);
  const navigate = useNavigate();
  const organizerDetails = async (organizerId) => {
    const organizer = await fetchOrganizerDetails(organizerId, 1);
    console.log(organizer);
    navigate("/OrganizersDetails", {
      state: {
        organizerId,
        initialOrganizerDetails: organizer.data,
        totalCount: organizer.count,
      },
    });
  };

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

  if (announcements.length > 0) {
    content = (
      <>
        <ul className={styles["announcements-list"]}>
          {announcements.map((announce, index) => {
            return (
              <li key={index}>
                <AnnouncementCard
                  title={announce.announcement_title}
                  content={announce.announcement_body}
                  date={announce.created_at}
                  organizer={announce.organizer_name}
                  options={[
                    <CustomIconButton
                      key={"details-announce-btn"}
                      icon={<BsPersonLinesFill />}
                      classes={`${styles["details-announcement-btn"]}`}
                      onClick={() => organizerDetails(announce.organizer_id)}
                    />,
                  ]}
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

  return (
    <>
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
          context={OrganizersAnnouncementsContext}
        />
      ) : null}
      {content}
    </>
  );
};

export default OrganizersAnnouncements;
