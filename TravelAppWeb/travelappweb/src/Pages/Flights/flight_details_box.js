import React, { useState, useEffect } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import SpaIcon from "@mui/icons-material/Spa";
import BedIcon from "@mui/icons-material/Bed";
import WifiIcon from "@mui/icons-material/Wifi";
import TvIcon from "@mui/icons-material/Tv";
import AirlineSeatFlatIcon from "@mui/icons-material/AirlineSeatFlat";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import PrivacyTipIcon from "@mui/icons-material/PrivacyTip";
import ShowerIcon from "@mui/icons-material/Shower";
import BatteryChargingFullIcon from "@mui/icons-material/BatteryChargingFull";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import DiningIcon from "@mui/icons-material/Restaurant";
import RecliningIcon from "@mui/icons-material/AirlineSeatReclineNormal";
import { tableCellClasses } from "@mui/material/TableCell";

const ITEMS_PER_PAGE = 5;

const Container = styled(Box)(({ theme }) => ({
  border: "1px solid #ddd",
  borderRadius: "8px",
  overflow: "hidden",
  marginBottom: "16px",
  fontFamily: "Roboto, sans-serif",
  color: "var(--text-color)",
}));

const Header = styled(Box)(({ theme }) => ({
  backgroundColor: "#205E61",
  color: "var(--text-color)",
  padding: "16px",
  display: "flex",
  alignItems: "center",
}));

const AirlineImage = styled("img")({
  width: "50px",
  marginRight: "16px",
});

const TableHeader = styled(TableHead)({
  backgroundColor: "#ffb156",
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: "var(--text-color)",
  [`&.${tableCellClasses.head}`]: {
    fontSize: "1.25rem",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1rem",
  },
}));

const FeatureIcon = styled("span")({
  marginRight: "8px",
  display: "inline-flex",
  alignItems: "center",
  color:"var(--text-color)",
});

const getFeatureIcon = (feature) => {
  const iconStyle = { fontSize: "20px", color: "#ffb156", marginRight: "4px" };

  switch (feature) {
    case "Beverages":
    case "Drinks":
      return <LocalDrinkIcon style={iconStyle} />;
    case "Spa":
      return <SpaIcon style={iconStyle} />;
    case "Bedding":
    case "Lie seats":
      return <BedIcon style={iconStyle} />;
    case "Wifi":
      return <WifiIcon style={iconStyle} />;
    case "TV":
    case "Entertainment":
      return <TvIcon style={iconStyle} />;
    case "Privacy":
      return <PrivacyTipIcon style={iconStyle} />;
    case "Shower":
      return <ShowerIcon style={iconStyle} />;
    case "Charging":
      return <BatteryChargingFullIcon style={iconStyle} />;
    case "Meal":
    case "Fast Food":
      return <FastfoodIcon style={iconStyle} />;
    case "Buffet":
      return <DiningIcon style={iconStyle} />;
    case "Backrest":
      return <RecliningIcon style={iconStyle} />;
    default:
      return null;
  }
};

const FlightDetailBox = ({ flight }) => {
  const [page, setPage] = useState(1);
  const [filteredFlights, setFilteredFlights] = useState(flight.classes);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    filterFlights();
  }, [startDate, endDate, flight.classes]);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const filterFlights = () => {
    if (startDate && endDate) {
      const filtered = flight.classes.filter((classInfo) => {
        const departureDate = new Date(flight.departure_date);
        return departureDate >= startDate && departureDate <= endDate;
      });
      setFilteredFlights(filtered);
    } else {
      setFilteredFlights(flight.classes);
    }
  };

  const paginatedFlights = filteredFlights.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <Container>
      <Header>
        <AirlineImage src={flight.airline_pic} alt={flight.airline_name} />
        <Typography variant="h6">{flight.airline_name}</Typography>
      </Header>

      <Accordion sx={{ backgroundColor: "var(--card-color)" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: "var(--text-color)" }}>
            Flight Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHeader>
                <TableRow>
                  <StyledTableCell>Detail</StyledTableCell>
                  <StyledTableCell>Information</StyledTableCell>
                </TableRow>
              </TableHeader>
              <TableBody sx={{ backgroundColor: "var(--card-color)" }}>
                <TableRow>
                  <StyledTableCell>Source Country</StyledTableCell>
                  <StyledTableCell>{flight.source_country}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Source City</StyledTableCell>
                  <StyledTableCell>{flight.source_city}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Source Airport</StyledTableCell>
                  <StyledTableCell>{flight.source_airport}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Destination Country</StyledTableCell>
                  <StyledTableCell>{flight.destination_country}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Destination City</StyledTableCell>
                  <StyledTableCell>{flight.destination_city}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Destination Airport</StyledTableCell>
                  <StyledTableCell>{flight.destination_airport}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Arrival Date</StyledTableCell>
                  <StyledTableCell>{flight.arrival_date}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Departure Date</StyledTableCell>
                  <StyledTableCell>{flight.departure_date}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Overall Seats</StyledTableCell>
                  <StyledTableCell>{flight.overall_seats}</StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell>Available Seats</StyledTableCell>
                  <StyledTableCell>{flight.available_seats}</StyledTableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ backgroundColor: "var(--card-color)" }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6" sx={{ color: "var(--text-color)" }}>
            Class Details
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHeader>
                <TableRow>
                  <StyledTableCell>Class</StyledTableCell>
                  <StyledTableCell>Price</StyledTableCell>
                  <StyledTableCell>Weight</StyledTableCell>
                  <StyledTableCell>Available Seats</StyledTableCell>
                  <StyledTableCell>Features</StyledTableCell>
                </TableRow>
              </TableHeader>
              <TableBody sx={{ backgroundColor: "var(--card-color)" }}>
                {paginatedFlights.map((classInfo, index) => (
                  <TableRow key={index}>
                    <StyledTableCell>{classInfo.name}</StyledTableCell>
                    <StyledTableCell>{classInfo.price}</StyledTableCell>
                    <StyledTableCell>{classInfo.weight}</StyledTableCell>
                    <StyledTableCell>{classInfo.available_seats}</StyledTableCell>
                    <StyledTableCell>
                      {classInfo.features.map((feature, i) => (
                        <FeatureIcon key={i}>
                          {getFeatureIcon(feature)}
                          {feature}
                        </FeatureIcon>
                      ))}
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </Container>
  );
};

export default FlightDetailBox;
