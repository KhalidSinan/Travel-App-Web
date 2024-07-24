import { BsSearch } from "react-icons/bs";
import styles from "./SearchBar.module.css";

const SearchBar = ({
  size = 32,
  onSearchDone,
  onUpdateValue,
  value,
  classes,
}) => {
  return (
    <form onSubmit={onSearchDone}>
      <div className={`${styles["search-bar"]} ${classes}`}>
        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={onUpdateValue}
        />
        <button onClick={onSearchDone} type="submit">
          <BsSearch fontSize={size} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
<<<<<<< HEAD
=======




>>>>>>> 2a1b63a8ef50a1d2e027648640667b1440734741
