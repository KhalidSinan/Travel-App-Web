import { useCallback, useContext, useEffect, useState } from "react";
import AnnouncementCard from "../AnnouncementCard/AnnouncementCard";
import styles from "./AppAnnouncements.module.css";
import { AuthLogin } from "../../../Context/login_context";
import { CircularProgress } from "@mui/material";

const AppAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const loginContext = useContext(AuthLogin);

  const getAllAppAnnouncements = useCallback(async () => {
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
      const appAnnouncements = [];
      for (let index in data.data) {
        if (!data.data[index]["from_organizer"]) {
          appAnnouncements.push(data.data[index]);
        }
      }
      setAnnouncements(appAnnouncements.reverse());
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    getAllAppAnnouncements();
  }, [getAllAppAnnouncements]);

  let content = <h2>No Announcements Found</h2>

  if(error) {
    content = <h2>{error}</h2>
  }

  if(isLoading){
    content = <div className={styles.loading}><CircularProgress/></div>
  }

  if(announcements.length > 0){
    content = <ul className={styles["announcements-list"]}>
    {announcements.map((announce,index) => {
      return (
        <li key={index}>
          <AnnouncementCard
            key={announce.announcement_title}
            title={announce.announcement_title}
            content={announce.announcement_body}
            date={announce.created_at}
          />
        </li>
      );
    })}
  </ul>
  }

  return (
    <>
    {content}
    </>
  );
};

export default AppAnnouncements;
