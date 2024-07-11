import React from "react";
import styles from "./DashboardBar.module.css";
import ProfileCircle from "./ProfileCircle";
import ThemeButton from "./ThemeButton";
import NotificationButton from "./NotificationButton";

const DashboardBar = (_) => {
  return (
    <div className={styles['main-header']}>
      <nav className={styles['dashboard-bar']}>
        <div>
          <h2 className="logo">JourneyJoy</h2>
          {/* plane image move when hover the logo and disappear when leave */}
        </div>
        <ul className={styles['dashboard-bar-btns']}>
          <li>
            <ThemeButton />
          </li>
          <li>
            <NotificationButton />
          </li>
          <li>
            <ProfileCircle />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardBar;
