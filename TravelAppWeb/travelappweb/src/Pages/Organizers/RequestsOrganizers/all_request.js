import React, { useContext, useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../../helper/custom_card";
import CustomPagination from "../../../helper/custom_pagination";
import OrganizersContext from "../../../Context/organizers_context";
import AutohideSnackbar from "../../../helper/snackbar";
const ITEMS_PER_PAGE = 6;

const AllRequest = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const {
    fetchorganizerAllRequest,
    fetchOrganizerRequestDetails,
    RefuseOrganizer,
  } = useContext(OrganizersContext);
  const [card, setcard] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchorganizerAllRequest(page);
      console.log(result);
      setcard(result.data);
      setCount(result.count);
    };
    fetchData();
  }, [page, fetchorganizerAllRequest, count]);

  const handleDetailsClick = async (card) => {
    console.log(card.id);
    const organizerRequestDetails = await fetchOrganizerRequestDetails(card.id);
    console.log(organizerRequestDetails);
    navigate("/OrganizerDetailsRequest", {
      state: {
        organizerId: card.id,
        OrganizerRequestDetails: organizerRequestDetails.data,
      },
    });
  };

  const handleRefuseOrganizer = async (card) => {
    try {
      const data = await RefuseOrganizer(card.id);
      console.log(data);
      navigate("/organizers");

      if (data) {
        <AutohideSnackbar message={data.message} />;
      }
    } catch (error) {
      console.error("Error Accept organizer:", error);
    }
  };
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "var(--background)" }}>
      <Grid container spacing={4} marginTop="20px">
        {card.map((card) => (
          <Grid item key={card.id} xs={12} sm={6} md={4} lg={4}>
            <CustomCard
              card={card}
              handleDetailsClick={() => handleDetailsClick(card)}
              handleClickRefuse={() => handleRefuseOrganizer(card)}
            />
          </Grid>
        ))}
      </Grid>
      <CustomPagination
        count={Math.ceil(count / ITEMS_PER_PAGE)}
        page={page}
        onChange={handleChangePage}
      />
    </Box>
  );
};

export default AllRequest;
