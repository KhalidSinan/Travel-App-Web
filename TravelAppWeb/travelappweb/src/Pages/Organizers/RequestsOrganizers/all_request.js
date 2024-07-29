import React, { useContext, useState, useEffect } from "react";
import { Grid, Box, CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomCard from "../../../helper/custom_card";
import CustomPagination from "../../../helper/custom_pagination";
import OrganizersContext from "../../../Context/organizers_context";
import AutohideSnackbar from "../../../helper/snackbar";

const ITEMS_PER_PAGE = 6;

const AllRequest = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");
  
  const {
    fetchorganizerAllRequest,
    fetchOrganizerRequestDetails,
    RefuseOrganizer,
  } = useContext(OrganizersContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchorganizerAllRequest(page);
        setCards(result.data);
        setCount(result.count);
        setMessage(result.data.length === 0 ? "No requests found." : "");
      } catch (error) {
        console.error("Error fetching organizer requests:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, fetchorganizerAllRequest]);

  const handleDetailsClick = async (card) => {
    try {
      const organizerRequestDetails = await fetchOrganizerRequestDetails(card.id);
      navigate("/OrganizerDetailsRequest", {
        state: {
          organizerId: card.id,
          OrganizerRequestDetails: organizerRequestDetails.data,
        },
      });
    } catch (error) {
      console.error("Error fetching organizer request details:", error);
    }
  };

  const handleRefuseOrganizer = async (card) => {
    try {
      const data = await RefuseOrganizer(card.id);
      setMessage(data.message);
      navigate("/organizers");
    } catch (error) {
      console.error("Error refusing organizer:", error);
    }
  };

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: "var(--background)" }}>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {message && (
            <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: '20px' }}>
              {message}
            </Typography>
          )}
          <Grid container spacing={4} marginTop="20px">
            {cards.map((card) => (
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
        </>
      )}
      {message && <AutohideSnackbar message={message} />}
    </Box>
  );
};

export default AllRequest;
