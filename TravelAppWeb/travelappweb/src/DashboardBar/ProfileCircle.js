import { Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import styles from "./ProfileCircle.module.css";
const ProfileCircle = (props) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const openProfileMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const closeProfileMenu = () => {
      setAnchorEl(null);
    };
  return (
    <React.Fragment>
      <button
        className={styles['profile-btn']}
        aria-controls={open ? "profile-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={openProfileMenu}
      >
        <BsFillPersonFill fontSize={24} />
      </button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeProfileMenu}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={closeProfileMenu}>Profile</MenuItem>
        <MenuItem onClick={closeProfileMenu}>Logout</MenuItem>
      </Menu>
    </React.Fragment>
  );
};


export default ProfileCircle;