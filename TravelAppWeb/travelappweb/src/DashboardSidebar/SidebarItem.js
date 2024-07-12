import { Link } from "react-router-dom";
import styles from "./SidebarItem.module.css";

const SidebarItem = (props) => {
  return (
    <li>
      <Link 
      className={`${styles['sidebar-item']} ${props.isActive ? styles.active : ''}`}
      onClick={props.onPageChange}
      to={props.page.page}
      >
        {props.page.icon}
        <h4>{props.page.name}</h4>
      </Link>
    </li>
  );
};

export default SidebarItem;