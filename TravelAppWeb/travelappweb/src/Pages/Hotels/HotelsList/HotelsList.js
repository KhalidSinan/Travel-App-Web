import React, { useContext } from "react";
import styles from "./HotelsList.module.css";
import HotelCard from "../HotelCard/HotelCard";
import { HotelsContext } from "../../../Context/hotels_context";
const HotelsList = () => {
  const { hotels } = useContext(HotelsContext);

  return (
    <ul className={styles["hotels-list"]}>
      {hotels.map((hotel) => {
        return (
          <li key={hotel.id}>
            <HotelCard
              id={hotel.id}
              reservations={hotel.reservationsCount}
              image={hotel.images}
              name={hotel.name}
              location={hotel.location}
              stars={hotel.stars}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default HotelsList;
