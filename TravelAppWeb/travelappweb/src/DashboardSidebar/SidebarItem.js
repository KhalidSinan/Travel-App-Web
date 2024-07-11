import styles from "./SidebarItem.module.css";

const SidebarItem = (props) => {
  return (
    <li>
      <button 
      className={`${styles['sidebar-item']} ${props.isActive ? styles.active : ''}`} 
      onClick={props.onPageChange}>
        {props.page.icon}
        <h4>{props.page.name}</h4>
      </button>
    </li>
  );
};

export default SidebarItem;