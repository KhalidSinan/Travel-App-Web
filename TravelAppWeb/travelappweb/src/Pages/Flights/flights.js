import React, { useState, useEffect, useContext } from "react";
import FlightDetailBox from "./flight_details_box";
import { Box, Grid } from "@mui/material";
import CustomPagination from "../../helper/custom_pagination";
import DateFilter from "../../helper/Components/DateFilter/date_filter";
import SearchBar from "../../helper/Components/SearchBar/SearchBar";
import { AuthLogin } from "../../Context/login_context";

const ITEMS_PER_PAGE = 5;

const Flights = () => {
  const { Token } = useContext(AuthLogin);
  const [page, setPage] = useState(1);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [totalFlights, setTotalFlights] = useState(0);

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
    try {
      const startDateParam = startDate ? formatDate(startDate) : "";
      const endDateParam = endDate ? formatDate(endDate) : "";
      const searchParam = searchValue ? `&search=${searchValue}` : "";

      const response = await fetch(
        `http://localhost:5000/dashboard/flights?start_date=${startDateParam}&end_date=${endDateParam}&page=${page}&search=${searchParam}`, {
          headers: {
            Authorization: `Bearer ${Token}`,
          },
        }
      );

      const data = await response.json();
      setFilteredFlights(data.data);
      setTotalFlights(data.count);
    } catch (error) {
      console.error("Error fetching flights:", error);
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
      <Box >
        {filteredFlights.map((flight, index) => (
          <FlightDetailBox key={index} flight={flight} />
        ))}
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CustomPagination
          count={Math.ceil(totalFlights / ITEMS_PER_PAGE)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
    </Box>
  );
};

export default Flights;
