import { BsArrow90DegDown, BsCheck, BsPerson, BsPersonLinesFill } from "react-icons/bs";
import CustomButton from "../../../helper/Components/CustomButton/CustomButton";
import CustomIconButton from "../../../helper/Components/IconButton/CustomIconButton";
import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";
import styles from "./OrganizersAnnouncements.module.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthLogin } from "../../../Context/login_context";
import { CircularProgress } from "@mui/material";
import OrganizersContext from "../../../Context/organizers_context";
import { useNavigate } from "react-router-dom";

const OrganizersAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const loginContext = useContext(AuthLogin);
  const {fetchOrganizerDetails} = useContext(OrganizersContext); 
  const navigate = useNavigate();

  const getAllOrganizersAnnouncements = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://localhost:5000/dashboard/announcements",
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
      const organizersAnnouncements = [];
      for (let index in data.data) {
        if (data.data[index]["from_organizer"]) {
          organizersAnnouncements.push(data.data[index]);
        }
      }
      setAnnouncements(organizersAnnouncements);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

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
    getAllOrganizersAnnouncements();
  }, [getAllOrganizersAnnouncements]);

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
    );
  }

  return <>{content}</>;
};

export default OrganizersAnnouncements;
