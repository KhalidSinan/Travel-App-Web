import React from "react";
import videoError from "./videoerror403.mp4";
import styles from "./NotAuthorized.module.css";

const NotAuthorized = () => {
  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video width="600" loop autoPlay muted>
          <source src={videoError} type="video/mp4" />
        </video>
        <p className={styles.errorText}>
          This Page is not available .You can explore other destinations
        </p>
      </div>
    </div>
  );
};

export default NotAuthorized;
