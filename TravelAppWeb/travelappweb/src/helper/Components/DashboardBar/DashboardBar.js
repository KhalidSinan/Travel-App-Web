import React, { useContext, useState } from "react";
import styles from "./DashboardBar.module.css";
import ProfileCircle from "./ProfileCircle";
import ThemeButton from "./ThemeButton";
import NotificationButton from "./NotificationButton";
import CustomIconButton from "../IconButton/CustomIconButton";
import { BiSolidLogOut } from "react-icons/bi";
import { BsArrowRightSquare, BsArrowRightSquareFill } from "react-icons/bs";
import CustomButton from "../CustomButton/CustomButton";
import { LogoutOutlined, LogoutRounded } from "@mui/icons-material";
import { AuthLogin } from "../../../Context/login_context";
import LogoutDialog from "../LogoutDialog/LogoutDialog";

const DashboardBar = (_) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  }

  const onLogout = () => {
    setOpen(true);
  }

  return (
    <div className={styles['main-header']}>
      <nav className={styles['dashboard-bar']}>
        <div>
          <h2 className={styles['logo']}>JourneyJoy</h2>
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
            <LogoutDialog
            open={open}
            onClose={onClose}
            />
            <CustomIconButton 
            icon={<LogoutRounded />}
            onClick={onLogout} 
            />
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardBar;
