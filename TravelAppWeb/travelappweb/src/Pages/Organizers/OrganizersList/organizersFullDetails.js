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
  styled,
  tableCellClasses,
  CircularProgress,
  Alert,
} from "@mui/material";
import Header from "../../../helper/typography";
import { useLocation } from "react-router-dom";
import OrganizersContext from "../../../Context/organizers_context";

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: "var(--text-color)",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "var(--text-color)",
  },
}));

const OrganizersFullDetails = () => {
  const { fetchTripDetails } = useContext(OrganizersContext);
  const location = useLocation();
  const { tripId, organizerId } = location.state || {};
  const [tripDetails, setTripDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (tripId && organizerId) {
      fetchTripDetails(organizerId, tripId).then((data) => {
        setTripDetails(data);
        setLoading(false);
      });
    }
  }, [tripId, organizerId, fetchTripDetails]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!tripDetails) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <Alert severity="info">No trip details found</Alert>
      </Box>
    );
  }

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
          color: "var(--primary-color)",
          alignItems: "flex-start",
        }}
      >
        General Info
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "20px", backgroundColor: "var(--card-color)" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "var(--secondary-color)" }}>
            <TableRow>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
              <StyledTableCell>Commission</StyledTableCell>
              <StyledTableCell>Number of People</StyledTableCell>
              <StyledTableCell>Number of Destinations</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <StyledTableCell>{data.start_date}</StyledTableCell>
              <StyledTableCell>{data.end_date}</StyledTableCell>
              <StyledTableCell>{data.price}</StyledTableCell>
              <StyledTableCell>{data.commission}</StyledTableCell>
              <StyledTableCell>{data.num_of_people}</StyledTableCell>
              <StyledTableCell>{data.num_of_destinations}</StyledTableCell>
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
          color: "var(--primary-color)",
          alignItems: "flex-start",
        }}
      >
        Hotels Info
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "20px", backgroundColor: "var(--card-color)" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "var(--secondary-color)" }}>
            <TableRow>
              <StyledTableCell>Hotel Name</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Stars</StyledTableCell>
              <StyledTableCell>Start Date</StyledTableCell>
              <StyledTableCell>End Date</StyledTableCell>
              <StyledTableCell>Overall Price</StyledTableCell>
              <StyledTableCell>Number of Rooms</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.hotels.map((hotel, index) => (
              <TableRow key={index}>
                <StyledTableCell>{hotel.hotel_name}</StyledTableCell>
                <StyledTableCell>{hotel.hotel_location}</StyledTableCell>
                <StyledTableCell>{hotel.hotel_stars}</StyledTableCell>
                <StyledTableCell>{hotel.start_date}</StyledTableCell>
                <StyledTableCell>{hotel.end_date}</StyledTableCell>
                <StyledTableCell>{hotel.overall_price}</StyledTableCell>
                <StyledTableCell>{hotel.num_of_rooms}</StyledTableCell>
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
          color: "var(--primary-color)",
          alignItems: "flex-start",
        }}
      >
        Places Info
      </Typography>
      <TableContainer component={Paper} sx={{ marginBottom: "20px", backgroundColor: "var(--card-color)" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "var(--secondary-color)" }}>
            <TableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell>Location</StyledTableCell>
              <StyledTableCell>Category</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.places.map((place, index) => (
              <TableRow key={index}>
                <StyledTableCell>{place.name}</StyledTableCell>
                <StyledTableCell>{place.location}</StyledTableCell>
                <StyledTableCell>{place.category}</StyledTableCell>
                <StyledTableCell>{place.phone_number}</StyledTableCell>
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
          color: "var(--primary-color)",
          alignItems: "flex-start",
        }}
      >
        Flight Info
      </Typography>
      <TableContainer component={Paper} sx={{ backgroundColor: "var(--card-color)" }}>
        <Table>
          <TableHead sx={{ backgroundColor: "var(--secondary-color)" }}>
            <TableRow>
              <StyledTableCell>Airline</StyledTableCell>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Duration</StyledTableCell>
              <StyledTableCell>Source</StyledTableCell>
              <StyledTableCell>Source Airport</StyledTableCell>
              <StyledTableCell>Destination</StyledTableCell>
              <StyledTableCell>Destination Airport</StyledTableCell>
              <StyledTableCell>Class</StyledTableCell>
              <StyledTableCell>Price</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.flights.map((flight, index) => (
              <TableRow key={index}>
                <StyledTableCell>{flight.airline}</StyledTableCell>
                <StyledTableCell>{flight.date}</StyledTableCell>
                <StyledTableCell>{flight.duration}</StyledTableCell>
                <StyledTableCell>{flight.source}</StyledTableCell>
                <StyledTableCell>{flight.source_airport}</StyledTableCell>
                <StyledTableCell>{flight.destination}</StyledTableCell>
                <StyledTableCell>{flight.destination_airport}</StyledTableCell>
                <StyledTableCell>{flight.class}</StyledTableCell>
                <StyledTableCell>{flight.price}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OrganizersFullDetails;
