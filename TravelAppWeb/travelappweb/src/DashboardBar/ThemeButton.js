import { useState } from "react";
import { BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import styles from "./ThemeButton.module.css";
const ThemeButton = (props) => {
    const [isDarkTheme, setDarkTheme] = useState(false);

    const onThemeChangeHandler = _ => {
      setDarkTheme(!isDarkTheme);
    };
  
    const getThemeIcon = () => {
      return isDarkTheme ? 
        <BsMoonFill fontSize={18} />: 
        <BsBrightnessHighFill 
        fontSize={24} 
        color="yellow" />
    }
  return (
    <button className={styles['theme-btn']} 
    onClick={onThemeChangeHandler}>
      {getThemeIcon()}
    </button>
  );
};

export default ThemeButton;
