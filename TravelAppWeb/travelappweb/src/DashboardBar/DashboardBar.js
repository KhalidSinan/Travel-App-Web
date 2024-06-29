import React from "react";
import "./DashboardBar.css";
import { BsBellFill } from "react-icons/bs";
import ProfileCircle from "./ProfileCircle";
import ThemeButton from "./ThemeButton";

const DashboardBar = (_) => {
  return (
    <div className="main-header">
      <nav className="dashboard-bar">
        <div>
          <h2 className="logo">JourneyJoy</h2>
          {/* plane image move when hover the logo and disappear when leave */}
        </div>
        <ul className="dashboard-bar-btns">
          <li>
            <ThemeButton />
          </li>
          <li>
            <button className="notification-btn">
              <BsBellFill fontSize={18} />
            </button>
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
