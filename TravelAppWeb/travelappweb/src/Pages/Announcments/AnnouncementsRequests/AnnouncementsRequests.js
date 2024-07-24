import React, { useCallback, useContext, useEffect, useState } from "react";
import styles from "./AnnouncementsRequests.module.css";
import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";
import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import { BsCheck2, BsPersonLinesFill, BsXLg } from "react-icons/bs";
import { AuthLogin } from "../../../Context/login_context";
import {
  CircularProgress,
} from "@mui/material";
import AcceptDialog from "../AcceptDialog/AcceptDialog";
import { AutoAwesome } from "@mui/icons-material";
import DenyDialog from "../DenyDialog/DenyDialog";
import OrganizersContext from "../../../Context/organizers_context";
import { useNavigate } from "react-router-dom";

const AnnouncementsRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const loginContext = useContext(AuthLogin);
  const [acceptDialogOpen, setAcceptDialogOpen] = useState({open: false, announce: null});
  const [denyDialogOpen, setDenyDialogOpen] = useState({open:false, announce: null});
  const {fetchOrganizerDetails} = useContext(OrganizersContext);
  const navigate = useNavigate();
  const getAllAnnouncementsRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/announcement-requests?limit=10&page=1",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${loginContext.Token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("An error occured while fetching announcements");
      }
      const data = await response.json();
      const announcementsRequests = [];
      for (let index in data.data) {
        const {
          id,
          announcement_title: title,
          announcement_body: content,
          organizer_name,
          organizer_id,
          organized_trip_id,
          created_at,
        } = data.data[index];
        announcementsRequests.push({
          id,
          title,
          content,
          created_at,
          organizer_name,
          organizer_id,
          organized_trip_id,
        });
      }
      setRequests(announcementsRequests);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const onAcceptDialogOpen = (announce) => {
    setAcceptDialogOpen({open: true, announce});
  }

  const onAcceptDialogClose = () => {
    setAcceptDialogOpen({open: false, announce: null});
  }
  
  const onDenyDialogOpen = (announce) => {
    setDenyDialogOpen({open: true, announce});
  }

  const onDenyDialogClose = () => {
    setDenyDialogOpen({open: false, announce: null});
  }

  const onAcceptAnnouncement = () => {
    const newRequests = requests.filter((request) => request.id !== acceptDialogOpen.announce.id);
    setRequests(newRequests);
    onAcceptDialogClose();
  }

  const onDenyAnnouncement = () => {
    const newRequests = requests.filter((request) => request.id !== denyDialogOpen.announce.id);
    setRequests(newRequests);
    onDenyDialogClose();
  }

  const organizerDetails = async (organizerId) => {
    const organizer = await fetchOrganizerDetails(organizerId, 1);
    console.log(organizer);
    navigate('/OrganizersDetails' , {
      state: {
        organizerId,
        initialOrganizerDetails: organizer.data,
        totalCount: organizer.count,
      },
    })
    
  }


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
                      classes={`${styles["accept-announcement-btn"]} ${styles["announcement-btn"]}`}
                      onClick={() => onAcceptDialogOpen(announce)}
                    />,
                    <CustomIconButton
                      key={"deny-announce-btn"}
                      icon={<BsXLg />}
                      classes={`${styles["deny-announcement-btn"]} ${styles["announcement-btn"]}`}
                      onClick={() => onDenyDialogOpen(announce)}
                    />,
                    <CustomIconButton
                      key={"details-announce-btn"}
                      icon={<BsPersonLinesFill />}
                      classes={`${styles["details-announcement-btn"]} ${styles["announcement-btn"]}`}
                      onClick={() => organizerDetails(announce.organizer_id)}
                    />,
                  ]}
                />
              </li>
            );
          })}
        </ul>
      </>
    );
  }

  return <>{content}</>;
};

export default AnnouncementsRequests;
