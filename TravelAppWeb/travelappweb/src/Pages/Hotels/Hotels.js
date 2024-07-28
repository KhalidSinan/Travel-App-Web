import React, { useContext, useEffect, useState } from "react";
import styles from "./Hotels.module.css";
import HotelsList from "./HotelsList/HotelsList";
import HotelsContextProvider, {
  HotelsContext,
} from "../../Context/hotels_context";
import { CircularProgress, Rating } from "@mui/material";
import CustomPagination from "../../helper/custom_pagination";
import CustomIconButton from "../../helper/Components/IconButton/CustomIconButton";
import { BsFilter, BsSortDown, BsSortUp } from "react-icons/bs";
import SearchBar from "../../helper/Components/SearchBar/SearchBar";

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
    toggleSort,
    changeStars,
    searchHotel,
  } = useContext(HotelsContext);

  const [showFilter, setShowFilter] = useState(false);

  const toggleFilter = () => setShowFilter((prev) => !prev);

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

  if (hotels.length > 0) {
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
            classes={`${showFilter ? styles['filter-active'] : ""} ${styles['option-btn']}`}
            onClick={toggleFilter}
          />
          <CustomIconButton
            icon={sort === "desc" ? <BsSortUp /> : <BsSortDown />}
            text="Sort"
            onClick={toggleSort}
            classes={`${styles['option-btn']}`}
          />
          <SearchBar
           value={searchQuery}
           onUpdateValue={event => searchHotel(event.target.value)}
           />
        </div>
      </header>
      <hr></hr>
      <section className={styles["hotels-content"]}>
        <div
          className={`${styles["stars"]} ${!showFilter ? styles["hide"] : ""}`}
        >
          <h3>Filter Hotels By Stars:</h3>
          <Rating
            value={stars}
            precision={0.5}
            onChange={(event) => changeStars(event.target.value)}
          />
        </div>
        {content}
      </section>
    </section>
  );
};

export default Hotels;
