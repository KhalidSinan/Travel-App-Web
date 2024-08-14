import { BiSolidDashboard, BiSolidHotel } from "react-icons/bi";
import styles from "./DashboardSidebar.module.css";
import {
  BsExclamationOctagonFill,
  BsFillPeopleFill,
  BsFillSendFill,
  BsHousesFill,
  BsPersonFill,
} from "react-icons/bs";
import { MdOutlineFlightTakeoff } from "react-icons/md";
import SidebarItem from "./SidebarItem.js";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { LocationOnOutlined } from "@mui/icons-material";

const pages = [
  {
    "index": 0,
    "name": "Dashboard",
    "icon": <BiSolidDashboard />,
    "page": "/dashboard",
    },
    {
      "index": 1,
      "name" : "Admins",
      "icon" : <BsPersonFill />,
      "page" : "/admins"
    },
    {
      "index": 2,
      "name" : "Organizers",
      "icon" : <BsFillPeopleFill />,
      "page" : "/organizers"
    },
    {
      "index": 3,
      "name" : "Announcements",
      "icon" : <BsFillSendFill />,
      "page" : "/announcements"
    },
    {
      "index": 4,
      "name" : "Flights",
      "icon" : <MdOutlineFlightTakeoff/>,
      "page" : "/flights"
    },
    {
      "index": 5,
      "name" : "Hotels",
      "icon" : <BsHousesFill />,
      "page" :  "/hotels"
  },
    {
      "index": 6,
      "name" : "Reports",
      "icon" : <BsExclamationOctagonFill />,
      "page" :  "/reports"
  },
];

const DashboardSidebar = (props) => {
  const location = useLocation();
  const [currentPage, setCurrentPage] = useState(0);
  const onPageChange = (index) => {
    setCurrentPage(index);
    localStorage.setItem("current-page", index);
  };

  useEffect(() => {
    const page = localStorage.getItem("current-page");
    if (!page) setCurrentPage(0);
    else setCurrentPage(+page);
  }, []);

  useEffect(() => {
    if (location.pathname === "/Notifications") {
      setCurrentPage(-1);
      localStorage.setItem("current-page", -1);
    }
    if(location.pathname === '/hotels'){
      setCurrentPage(5);
      localStorage.setItem('current-page', 5);
    }
  }, [location]);

  return (
    <div className={styles["main-sidebar"]}>
      <ul className={styles["sidebar-list"]}>
        {pages.map((page) => (
          <SidebarItem
            key={page.index}
            page={page}
            isActive={currentPage === page.index}
            onPageChange={() => onPageChange(page.index)}
          />
        ))}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
