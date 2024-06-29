import "./SidebarItem.css";

const SidebarItem = (props) => {
    let sidebarItemClass = "sidebar-item";
    sidebarItemClass += props.isActive ? " active" : "";
  return (
    <li>
      <button className={sidebarItemClass} onClick={props.onPageChange}>
        {props.page.icon}
        <h4>{props.page.name}</h4>
      </button>
    </li>
  );
};

export default SidebarItem;