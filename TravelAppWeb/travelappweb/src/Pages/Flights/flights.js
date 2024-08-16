import React, { useState, useEffect, useContext } from "react";
import FlightDetailBox from "./flight_details_box";
import { Box, Grid, CircularProgress, Typography, Alert } from "@mui/material";
import CustomPagination from "../../helper/custom_pagination";
import DateFilter from "../../helper/Components/DateFilter/date_filter";
import SearchBar from "../../helper/Components/SearchBar/SearchBar";
import { AuthLogin } from "../../Context/login_context";
import { baseUrl } from "../../App";

const ITEMS_PER_PAGE = 5;

const Flights = () => {
  const { Token } = useContext(AuthLogin);
  const [page, setPage] = useState(1);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [totalFlights, setTotalFlights] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    fetchFlights();
  }, [startDate, endDate, searchValue, page]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchFlights = async () => {
    setLoading(true);
    setError(null); 

    try {
      const startDateParam = startDate ? formatDate(startDate) : "";
      const endDateParam = endDate ? formatDate(endDate) : "";
      const searchParam = searchValue ? `&search=${searchValue}` : "";

      const response = await fetch(
        `${baseUrl}/dashboard/flights?start_date=${startDateParam}&end_date=${endDateParam}&page=${page}${searchParam}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
            "ngrok-skip-browser-warning": "69420",

          },
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Failed to fetch flights");
      }

      const data = await response.json();
      if (data.data.length === 0) {
        setError("No flights found for the current criteria.");
      } else {
        setFilteredFlights(data.data);
        setTotalFlights(data.count);
      }
    } catch (error) {
      setError(error.message || "An error occurred while fetching flights.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchUpdate = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setPage(1);
    fetchFlights();
  };

  return (
    <Box sx={{ maxWidth: 1000, margin: "auto", padding: 4, position: "relative" }}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
        <Grid item xs={12} sm={8}>
          <SearchBar
            value={searchValue}
            onUpdateValue={handleSearchUpdate}
            onSearchDone={handleSearchSubmit}
          />
        </Grid>
        <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <DateFilter
            setStartDate={setStartDate}
            setEndDate={setEndDate}
            fetchFlights={fetchFlights}
          />
        </Grid>
      </Grid>
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Box sx={{ mb: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}
      {!loading && !error && (
        <Box>
          {filteredFlights.map((flight, index) => (
            <FlightDetailBox key={index} flight={flight} />
          ))}
        </Box>
      )}
      {!loading && !error && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CustomPagination
            count={Math.ceil(totalFlights / ITEMS_PER_PAGE)}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </Box>
  );
};

export default Flights;
