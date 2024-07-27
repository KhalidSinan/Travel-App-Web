import React from 'react';
import videoError from './videoerror404.mp4'; // Correct relative path

const PageNotFound = () => {
  return (
    <div className="video-container">
      <video width="600" controls>
        <source src={videoError} type="video/mp4" />
       
      </video>
    </div>
  );
}

export default PageNotFound;
