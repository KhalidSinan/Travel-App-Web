import styles from "./CustomIconButton.module.css";

const CustomIconButton = ({
  icon,
  bordered = false,
  colored = false,
  isAccept = false,
  isDeny = false,
  classes,
}) => {
  return (
    <button
      className={`
        ${styles["icon-btn"]} 
        ${bordered ? styles["bordered"] : ""} 
        ${colored ? styles["colored"] : ""}
        ${isAccept ? styles["accept"] : ""}
        ${isDeny ? styles["deny"] : ""}
        ${classes}`}
    >
      {icon}
    </button>
  );
};

export default CustomIconButton;
