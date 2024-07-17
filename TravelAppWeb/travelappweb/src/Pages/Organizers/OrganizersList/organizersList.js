import React, { useState, useContext } from "react";
import {
  Grid,
  Box,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../../helper/custom_card";
import CustomPagination from "../../../helper/custom_pagination";
import SearchIcon from "@mui/icons-material/Search";
import OrganizersContext from "../../../Context/organizers_context";

const ITEMS_PER_PAGE = 6;


const OrganizersList = () => {
  const navigate = useNavigate();
  const { cards, page, handleChangePage,count, fetchOrganizerDetails } =
    useContext(OrganizersContext);
    
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Handle search logic
  };

  const handleDetailsClick = async (card) => {
    const organizerDetails = await fetchOrganizerDetails(card.id, 1);

    navigate("/OrganizersDetails", {
      state: {
        organizerId: card.id,
        initialOrganizerDetails: organizerDetails.data,
        totalCount: organizerDetails.count,
      },
    });
  };

  return (
    <Box sx={{ padding: 3 }}>
      <form onSubmit={handleSearchSubmit}>
        <TextField
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          placeholder="Search..."
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton type="submit">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </form>

      <Grid container spacing={4} marginTop="20px">
        {cards.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={4}>
            <CustomCard
              card={card}
              handleDetailsClick={() => handleDetailsClick(card)}
            />
          </Grid>
        ))}
      </Grid>

      <CustomPagination
        count={Math.ceil(count / ITEMS_PER_PAGE)}
        page={page}
        onChange={(event, value) => handleChangePage(value)}
      />
    </Box>
  );
};

export default OrganizersList;
