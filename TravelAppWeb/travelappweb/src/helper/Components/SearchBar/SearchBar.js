
import { BsSearch } from 'react-icons/bs';
import styles from './SearchBar.module.css';

const SearchBar = ({ size = 32, onSearchDone,onUpdateValue, value, classes }) => {
    return (
        <div className={`${styles['search-bar']} ${classes}`}>
        <input type="text" placeholder="Search..." value={value} onChange={onUpdateValue}/>
        <button onClick={onSearchDone}>
          <BsSearch fontSize={size}/>
        </button>
      </div>
    );
}

export default SearchBar;




