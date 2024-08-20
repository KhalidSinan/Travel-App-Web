import React, { useContext, useEffect, useState } from "react";
import styles from "./HotelDetails.module.css";
import {
  CircularProgress,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { useScatterChartProps } from "@mui/x-charts/internals";
import { AuthLogin } from "../../../Context/login_context";
import { baseUrl } from "../../../App";

const HotelsDetails = () => {
  const { Token } = useContext(AuthLogin);
  const location = useLocation();
  const { hotelId } = location.state;
  const [hotel, setHotel] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getHotelDetails = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/dashboard/hotels/${hotelId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${Token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("An error occured while fetching hotels");
        }
        const data = await response.json();
        setHotel(data.data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    getHotelDetails();
  }, [hotelId]);
  return (
    <>
      {isLoading ? (
        <CircularProgress />
      ) : (
        <main className={styles["hotel-details-section"]}>
          <header className={styles["hotel-details"]}>
            <div className={styles["hotel-image"]}>
              <img src={`${baseUrl}/${hotel.images[0]}`} />
            </div>
            <div className={styles["hotel-info"]}>
              <h2>
                {hotel.name}{" "}
                <span>(Reservations: {hotel.reservationCount})</span>
              </h2>
              <h3>
                {hotel.location}{" "}
                <span>
                  (From City Center: {hotel.distance_from_city_center}KM)
                </span>
              </h3>
              <div className={styles["hotel-stars"]}>
                <Rating
                  name="read-only"
                  value={hotel.stars}
                  readOnly
                  precision={0.5}
                />
              </div>
            </div>
          </header>
          <article className={styles["hotel-description"]}>
            <h2>Description</h2>
            <p>{hotel.description}</p>
          </article>
          <section className={styles["hotel-rooms"]}>
            <h2>
              Rooms <span>( {hotel.rooms_number} )</span>
            </h2>
            <div className={styles["rooms-list"]}>
              <div className={styles["hotel-room-card"]}>
                <TableContainer component={Paper}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="right">Type</TableCell>
                        <TableCell align="right">Description</TableCell>
                        <TableCell align="right">Bed Options</TableCell>
                        <TableCell align="right">View</TableCell>
                        <TableCell align="right">Bed Count</TableCell>
                        <TableCell align="right">Sleeps Count</TableCell>
                        <TableCell align="right">Available Rooms</TableCell>
                        <TableCell align="right">Total Rooms</TableCell>
                        <TableCell align="right">Amenities</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {hotel['room_types'].map((room) => (
                        <TableRow
                          key={room.code}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="room" align="right">
                            {room.type}
                          </TableCell>
                          <TableCell align="right">{room.description}</TableCell>
                          <TableCell align="right">{room['bed_options']}</TableCell>
                          <TableCell align="right">{room['view']}</TableCell>
                          <TableCell align="right">{room['bed_options_count']}</TableCell>
                          <TableCell align="right">{room['sleeps_count']}</TableCell>
                          <TableCell align="right">{room['available_rooms']}</TableCell>
                          <TableCell align="right">{room['total_rooms']}</TableCell>
                          <TableCell align="right">{room['amenities'].join(' / ')}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </section>
        </main>
      )}
    </>
  );
};

export default HotelsDetails;
