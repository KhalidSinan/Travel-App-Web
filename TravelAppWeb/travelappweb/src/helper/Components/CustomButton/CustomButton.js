import styles from "./CustomButton.module.css";

const CustomButton = ({ name, primary = true, onClick ,classes}) => {
  const type = primary ? "primary-btn" : "secondary-btn";
  return (
    <button className={`${styles[type]} ${classes}`} onClick={onClick}>
      {name}
    </button>
  );
};

export default CustomButton;
