import { BiSolidDashboard } from "react-icons/bi";
import styles from "./DashboardSidebar.module.css";
import {
  BsExclamationOctagonFill,
  BsFillPeopleFill,
  BsFillSendFill,
  BsPersonFill,
} from "react-icons/bs";
import SidebarItem from "./SidebarItem.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomIconButton from "../helper/Widgets/IconButton/CustomIconButton.js";
const DashboardSidebar = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const navigate = useNavigate();
    const onPageChange = (index) => {
        setCurrentPage(index);
        navigate(pages[index].page)
    }
    const pages = [
        {
            "index": 0,
            "name" : "Dashboard",
            "icon" : <BiSolidDashboard />,
            "page" : "/register"
          },
          {
            "index": 1,
            "name" : "Admins",
            "icon" : <BsPersonFill />,
            "page" : "/"
          },
          {
            "index": 2,
            "name" : "Organizers",
            "icon" : <BsFillPeopleFill />,
            "page" : "/"
          },
          {
            "index": 3,
            "name" : "Announcments",
            "icon" : <BsFillSendFill />,
            "page" : "/"
          },
          {
            "index": 4,
            "name" : "Reports",
            "icon" : <BsExclamationOctagonFill />,
            "page" :  "/"
        },
    ]
  return (
    <div className={styles['main-sidebar']}>
      <CustomIconButton icon={<BsFillPeopleFill />} />
      <ul className={styles['sidebar-list']}>
        {
            pages.map(page => 
            <SidebarItem 
                key={page.index}
                page={page} 
                isActive={currentPage == page.index} 
                onPageChange={onPageChange.bind(this, page.index)}
                />)
        }
      </ul>
    </div>
  );
};

export default DashboardSidebar;
