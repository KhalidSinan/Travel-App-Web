import styles from "./CustomButton.module.css";

const CustomButton = ({
  name,
  primary = true,
  onClick,
  isSubmit = false,
  classes,
  disabled,
}) => {
  const type = primary ? "primary-btn" : "secondary-btn";
  return (
    <button
      disabled={disabled}
      type={isSubmit ? "submit" : "button"}
      className={`${styles[type]} ${classes}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default CustomButton;
