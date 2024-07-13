import styles from "./CustomButton.module.css";

const CustomButton = ({ name, primary = true, classes}) => {
  const type = primary ? "primary-btn" : "secondary-btn";
  return (
    <button className={`${styles[type]} ${classes}`}>
      {name}
    </button>
  );
};

export default CustomButton;
