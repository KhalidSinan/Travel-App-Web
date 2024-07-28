import React from 'react';
import videoError from './videoerror404.mp4'; // Correct relative path
import styles from './NotAuthorized.module.css'; 
const PageNotFound = () => {
  return (
    <div className={styles.container}>
    <div className={styles.videoContainer}>
      <video width="600" loop autoPlay muted>
        <source src={videoError} type="video/mp4" />
      </video>
      <p className={styles.errorText}>This path leads to nowhere . Let's explore a different journy together</p>
    </div>
  </div>
  );
}

export default PageNotFound;
