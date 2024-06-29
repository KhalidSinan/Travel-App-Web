import { useState } from "react";
import { BsBrightnessHighFill, BsMoonFill } from "react-icons/bs";
import "./DashboardBar.css";
const ThemeButton = (props) => {
    const [isDarkTheme, setDarkTheme] = useState(false);

    const onThemeChangeHandler = _ => {
      setDarkTheme(!isDarkTheme);
    };
  
    const getThemeIcon = () => {
      return isDarkTheme ? 
        <BsMoonFill fontSize={18} />: 
        <BsBrightnessHighFill fontSize={18} color="yellow" />
    }
  return (
    <button className="theme-btn" 
    onClick={onThemeChangeHandler}>
      {getThemeIcon()}
    </button>
  );
};

export default ThemeButton;
