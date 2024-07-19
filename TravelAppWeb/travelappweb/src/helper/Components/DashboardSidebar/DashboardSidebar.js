import { BiSolidDashboard } from "react-icons/bi";
import styles from "./DashboardSidebar.module.css";
import {
  BsExclamationOctagonFill,
  BsFillPeopleFill,
  BsFillSendFill,
  BsPersonFill,
} from "react-icons/bs";
import SidebarItem from "./SidebarItem.js";
import { useEffect, useState } from "react";

const pages = [
  {
      "index": 0,
      "name" : "Dashboard",
      "icon" : <BiSolidDashboard />,
      "page" : "/"
    },
    {
      "index": 1,
      "name" : "Admins",
      "icon" : <BsPersonFill />,
      "page" : "admins"
    },
    {
      "index": 2,
      "name" : "Organizers",
      "icon" : <BsFillPeopleFill />,
      "page" : "organizers"
    },
    {
      "index": 3,
      "name" : "Announcments",
      "icon" : <BsFillSendFill />,
      "page" : "announcments"
    },
    {
      "index": 4,
      "name" : "Reports",
      "icon" : <BsExclamationOctagonFill />,
      "page" :  "reports"
  },
]

const DashboardSidebar = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const onPageChange = (index) => {
        setCurrentPage(index);
        localStorage.setItem('current-page', index);
    }
    useEffect(() => {
      const page = localStorage.getItem('current-page');
      if(!page) setCurrentPage(0);
      else setCurrentPage(+page);
    } ,[]);
  return (
    <div className={styles['main-sidebar']}>
      <ul className={styles['sidebar-list']}>
        {
            pages.map(page => 
            <SidebarItem 
                key={page.index}
                page={page} 
                isActive={currentPage === page.index} 
                onPageChange={() => onPageChange(page.index)}
                />)
        }
      </ul>
    </div>
  );
};

export default DashboardSidebar;