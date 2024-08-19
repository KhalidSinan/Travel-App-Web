import React from "react";
import styles from "./HotelCard.module.css";
import { BsArrowRightShort } from "react-icons/bs";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../../../App";
const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  const goToDetails = () => {
    navigate("/hotelDetails", {
      state: {
        hotelId: hotel.id,
      }
    });
  };
  return (
    <div className={styles["hotel-card"]}>
      <header>
        <img src={`${baseUrl}/${hotel.images}`} />
      </header>
      <section>
        <h2 className={styles["hotel-name"]}>{hotel.name}</h2>
        <h3 className={styles["hotel-location"]}>{hotel.location}</h3>
        <div className={styles["hotel-stars"]}>
          <Rating name="read-only" value={hotel.stars} readOnly precision={0.5} />
        </div>
        <h3 className={styles['hotel-reservations']}>{hotel.reservationCount} Reservations</h3>
      </section>
      <div className={styles["hotel-details-btn"]} onClick={goToDetails}>
        <h3>Details</h3>
        <BsArrowRightShort size={20} />
      </div>
    </div>
  );
};

export default HotelCard;
