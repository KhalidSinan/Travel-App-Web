import React from "react";
import styles from "./HotelCard.module.css";
import { BsArrowRightShort } from "react-icons/bs";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
const HotelCard = ({id,reservations, image, name, location, stars }) => {
  const navigate = useNavigate();
  const goToDetails = () => {
    navigate("/hotelDetails", {
      state: {
        hotelId: id,
      }
    });
  };
  return (
    <div className={styles["hotel-card"]}>
      <header>
        <img src={`http://localhost:5000${image}`} />
      </header>
      <section>
        <h2 className={styles["hotel-name"]}>{name}</h2>
        <h3 className={styles["hotel-location"]}>{location}</h3>
        <div className={styles["hotel-stars"]}>
          <Rating name="read-only" value={stars} readOnly precision={0.5} />
        </div>
      </section>
      <div className={styles["hotel-details-btn"]} onClick={goToDetails}>
        <h3>Details</h3>
        <BsArrowRightShort size={20} />
      </div>
    </div>
  );
};

export default HotelCard;
