import React from 'react';
import videoError from './videoerror403.mp4'; // Correct relative path

const NotAuthorized = () => {
  return (
    <div className="video-container">
      <video width="600" controls>
        <source src={videoError} type="video/mp4" />
       
      </video>
    </div>
  );
}

export default NotAuthorized;
