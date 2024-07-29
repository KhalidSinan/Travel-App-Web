import React, { useContext, useEffect, useState } from "react";
import styles from "./AnnouncementsRequests.module.css";
import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";
import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import {
  BsCheck2,
  BsFilter,
  BsPersonLinesFill,
  BsSortDown,
  BsSortUp,
  BsXLg,
} from "react-icons/bs";
import { CircularProgress } from "@mui/material";
import AcceptDialog from "../AcceptDialog/AcceptDialog";
import DenyDialog from "../DenyDialog/DenyDialog";
import OrganizersContext from "../../../Context/organizers_context";
import { useNavigate } from "react-router-dom";
import { AnnouncementsRequestsContext } from "../../../Context/announcements_requests_context";
import AnnouncemenetsFilter from "../AnnouncementsFilter/AnnouncementsFilter";
import CustomPagination from "../../../helper/custom_pagination";

const AnnouncementsRequests = () => {
  const {
    requests,
    getAllAnnouncementsRequests,
    changePage,
    toggleSort,
    onAcceptDialogOpen,
    onAcceptDialogClose,
    onDenyDialogOpen,
    onDenyDialogClose,
    onAcceptAnnouncement,
    onDenyAnnouncement,
    acceptDialogOpen,
    denyDialogOpen,
    isLoading,
    error,
    page,
    count,
    sort,س
  } = useContext(AnnouncementsRequestsContext);
  const { fetchOrganizerDetails } = useContext(OrganizersContext);
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  const toggleShowFilter = () => setShowFilter((prev) => !prev);

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

  useEffect(() => {
    getAllAnnouncementsRequests();
  }, [getAllAnnouncementsRequests]);

  let content = <h2>No Announcements Requests Found</h2>;

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

  if (requests.length > 0) {
    content = (
      <>
        <AcceptDialog
          open={acceptDialogOpen.open}
          onClose={onAcceptDialogClose}
          announce={acceptDialogOpen.announce}
          onAccept={onAcceptAnnouncement}
        />
        <DenyDialog
          open={denyDialogOpen.open}
          onClose={onDenyDialogClose}
          announce={denyDialogOpen.announce}
          onDeny={onDenyAnnouncement}
        />
        <ul className={styles["announcements-list"]}>
          {requests.map((announce) => {
            return (
              <li key={announce.id}>
                <AnnouncementCard
                  title={announce.title}
                  content={announce.content}
                  date={announce.created_at}
                  organizer={announce.organizer_name}
                  options={[
                    <CustomIconButton
                      key={"accept-announce-btn"}
                      icon={<BsCheck2 />}
                      text="Accept"
                      classes={`${styles["accept-announcement-btn"]} ${styles["announcement-btn"]}`}
                      onClick={() => onAcceptDialogOpen(announce)}
                    />,
                    <CustomIconButton
                      key={"deny-announce-btn"}
                      icon={<BsXLg />}
                      text="Deny"
                      classes={`${styles["deny-announcement-btn"]} ${styles["announcement-btn"]}`}
                      onClick={() => onDenyDialogOpen(announce)}
                    />,
                    <CustomIconButton
                      key={"details-announce-btn"}
                      icon={<BsPersonLinesFill />}
                      text="Details"
                      classes={`${styles["details-announcement-btn"]} ${styles["announcement-btn"]}`}
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
          context={AnnouncementsRequestsContext}
        />
      ) : null}
      {content}
    </>
  );
};

export default AnnouncementsRequests;
