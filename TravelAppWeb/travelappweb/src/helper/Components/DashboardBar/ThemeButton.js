import styles from "./ThemeButton.module.css";
const ThemeButton = (props) => {
    const setDarkMode = () => {
      document.querySelector('body').setAttribute('theme-mode', 'dark');
      localStorage.setItem('theme', 'dark'); 
    }
    const setLightMode = () => {
      document.querySelector('body').setAttribute('theme-mode', 'light');
      localStorage.setItem('theme', 'light'); 
    }
    const selectedTheme = localStorage.getItem('theme');
    if(selectedTheme === 'dark') setDarkMode();
    else setLightMode();
    const toggleMode = (event) => {
      if(event.target.checked) setDarkMode();
      else setLightMode();
    }
  return (
    <label className={styles.switch}>
      <input type="checkbox" 
      onChange={toggleMode}
      defaultChecked={selectedTheme === 'dark'}/>
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default ThemeButton;
