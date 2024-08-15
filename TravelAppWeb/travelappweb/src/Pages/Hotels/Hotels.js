import React, { useContext, useEffect, useState } from "react";
import styles from "./Hotels.module.css";
import HotelsList from "./HotelsList/HotelsList";
import HotelsContextProvider, {
  HotelsContext,
} from "../../Context/hotels_context";
import {
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Rating,
} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import CustomPagination from "../../helper/custom_pagination";
import CustomIconButton from "../../helper/Components/IconButton/CustomIconButton";
import { BsFilter, BsSortDown, BsSortUp } from "react-icons/bs";
import SearchBar from "../../helper/Components/SearchBar/SearchBar";
import { RadioButtonStyle } from "../../helper/Styles/RadioButtonStyle";

const Hotels = () => {
  const {
    hotels,
    isLoading,
    error,
    page,
    count,
    sort,
    stars,
    searchQuery,
    getAllHotels,
    changePage,
    changeSort,
    changeStars,
    searchHotel,
  } = useContext(HotelsContext);

  const [showFilter, setShowFilter] = useState(false);
  const [showSort, setShowSort] = useState(false);

  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
    setShowSort(false);
  };
  const toggleSort = () => {
    setShowSort((prev) => !prev);
    setShowFilter(false);
  };

  useEffect(() => {
    getAllHotels();
  }, [getAllHotels]);

  let content = <h3>No Hotels Found</h3>;

  if (error) {
    content = <h3>{error}</h3>;
  }

  if (isLoading) {
    content = <CircularProgress />;
  }

  if (hotels.length > 0 && !isLoading) {
    content = (
      <>
        <HotelsList />
        <CustomPagination
          count={Math.ceil(count / 10)}
          page={page}
          onChange={(event, page) => changePage(event, page)}
        />
      </>
    );
  }
  return (
    <section className={styles["hotels-section"]}>
      <header className={styles["hotels-header"]}>
        <h1>Hotels</h1>
        <div className={styles["hotels-header-options"]}>
          <CustomIconButton
            icon={<BsFilter />}
            text="Filter"
            classes={`${showFilter ? styles["active"] : ""} ${
              styles["option-btn"]
            }`}
            onClick={toggleFilter}
          />
          <CustomIconButton
            icon={sort === "desc" ? <BsSortUp /> : <BsSortDown />}
            text="Sort"
            onClick={toggleSort}
            classes={`${styles["option-btn"]} ${
              showSort ? styles["active"] : ""
            }`}
          />
          <SearchBar
            value={searchQuery}
            onUpdateValue={(event) => searchHotel(event.target.value)}
          />
        </div>
      </header>
      <hr></hr>
      <section className={styles["hotels-content"]}>
        <div
          className={`${styles["filter"]} ${!showFilter ? styles["hide"] : ""}`}
        >
          <h3>Filter Hotels By Stars:</h3>
          <Rating
          color="var(--primary-color)"
            value={stars}
            precision={0.5}
            onChange={(event) => changeStars(event.target.value)}
            emptyIcon={<StarIcon style={{ color: "var(--text-color)", opacity: "0.1" }} />}
          />
        </div>
        <div className={`${styles["sort"]} ${!showSort ? styles["hide"] : ""}`}>
          <h3>Sort Hotels By:</h3>
          <div className={styles["sort-option"]}>
            <RadioGroup name="sort">
              <h4>Reservations</h4>
              <FormControlLabel
                value="reservationCount-asc"
                control={<Radio sx={RadioButtonStyle} />}
                label="Asc"
                onChange={changeSort}
                
              />
              <FormControlLabel
                value="reservationCount-desc"
                control={<Radio sx={RadioButtonStyle} />}
                label="Desc"
                onChange={changeSort}
              />
              <h4>Stars</h4>
              <FormControlLabel
                value="stars-asc"
                control={<Radio sx={RadioButtonStyle} />}
                label="Asc"
                onChange={changeSort}
              />
              <FormControlLabel
                value="stars-desc"
                control={<Radio sx={RadioButtonStyle} />}
                label="Desc"
                onChange={changeSort}
              />
            </RadioGroup>
          </div>
        </div>
        {content}
      </section>
    </section>
  );
};

export default Hotels;
