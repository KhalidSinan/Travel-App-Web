import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Header from "../../../helper/typography";
import { useLocation } from "react-router-dom";
import OrganizersContext from "../../../Context/organizers_context";

const OrganizersFullDetails = () => {
  const { fetchTripDetails } = useContext(OrganizersContext);

  const location = useLocation();
  const { tripId, organizerId } = location.state || {};

  const [tripDetails, setTripDetails] = useState(null);

  useEffect(() => {
    if (tripId && organizerId) {
      fetchTripDetails(organizerId, tripId).then((data) => {
        setTripDetails(data);
      });
    }
  }, [tripId, organizerId, fetchTripDetails]);

  if (!tripDetails) return <p>Loading...</p>;

  const { data } = tripDetails || {};

  return (
    <Box sx={{ padding: "20px" }}>
      <Header text="Trip Details" />

      {/* General Info Table */}
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "rgb(32,94,97)",
          alignItems: "flex-start",
        }}
      >
        General Info
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(255,176,86)" }}>
            <TableRow>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>Number of People</TableCell>
              <TableCell>Number of Destinations</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data.start_date}</TableCell>
              <TableCell>{data.end_date}</TableCell>
              <TableCell>{data.price}</TableCell>
              <TableCell>{data.commission}</TableCell>
              <TableCell>{data.num_of_people}</TableCell>
              <TableCell>{data.num_of_destinations}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Hotels Table */}
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "rgb(32,94,97)",
          alignItems: "flex-start",
        }}
      >
        Hotels Info
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(255,176,86)" }}>
            <TableRow>
              <TableCell>Hotel Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Stars</TableCell>
              <TableCell>Start Date</TableCell>
              <TableCell>End Date</TableCell>
              <TableCell>Overall Price</TableCell>
              <TableCell>Number of Rooms</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.hotels.map((hotel, index) => (
              <TableRow key={index} >
                <TableCell>{hotel.hotel_name}</TableCell>
                <TableCell>{hotel.hotel_location}</TableCell>
                <TableCell>{hotel.hotel_stars}</TableCell>
                <TableCell>{hotel.start_date}</TableCell>
                <TableCell>{hotel.end_date}</TableCell>
                <TableCell>{hotel.overall_price}</TableCell>
                <TableCell>{hotel.num_of_rooms}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Places Table */}
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "rgb(32,94,97)",
          alignItems: "flex-start",
        }}
      >
        Places Info
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "20px" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(255,176,86)" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.places.map((place, index) => (
              <TableRow key={index} >
                <TableCell>{place.name}</TableCell>
                <TableCell>{place.location}</TableCell>
                <TableCell>{place.category}</TableCell>
                <TableCell>{place.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Flights Table */}
      <Typography
        variant="h4"
        sx={{
          display: "flex",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "rgb(32,94,97)",
          alignItems: "flex-start",
        }}
      >
        Flight Info
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead sx={{ backgroundColor: "rgb(255,176,86)" }}>
            <TableRow>
              <TableCell>Airline</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Source Airport</TableCell>
              <TableCell>Destination</TableCell>
              <TableCell>Destination Airport</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.flights.map((flight, index) => (
              <TableRow key={index} >
                <TableCell>{flight.airline}</TableCell>
                <TableCell>{flight.date}</TableCell>
                <TableCell>{flight.duration}</TableCell>
                <TableCell>{flight.source}</TableCell>
                <TableCell>{flight.source_airport}</TableCell>
                <TableCell>{flight.destination}</TableCell>
                <TableCell>{flight.destination_airport}</TableCell>
                <TableCell>{flight.class}</TableCell>
                <TableCell>{flight.price}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrganizersFullDetails;
