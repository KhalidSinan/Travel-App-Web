import React, { useState, useEffect, useContext } from "react";
import { Box, Button, CircularProgress, Typography, Alert } from "@mui/material";
import Header from "../../../helper/typography";
import CustomCardCV from "../../../helper/card_cv";
import CustomTableCV from "../../../helper/table_cv";
import ImageList from "../../../helper/imageList";
import { HowToReg, PersonRemove } from "@mui/icons-material";
import CustomDialog from "../../../helper/dialog";
import OrganizersContext from "../../../Context/organizers_context";
import AutohideSnackbar from "../../../helper/snackbar";
import { useNavigate, useLocation } from "react-router-dom";

const OrganizerDetailsRequest = () => {
  const { acceptOrganizer, RefuseOrganizer, fetchOrganizerRequestDetails } = useContext(OrganizersContext) || {};
  const navigate = useNavigate();
  const location = useLocation();
  const { organizerId } = location.state || {};

  const [OrganizerRequestDetails, setOrganizerRequestDetails] = useState(location.state?.OrganizerRequestDetails || null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openAccept, setOpenAccept] = useState(false);
  const [loading, setLoading] = useState(!OrganizerRequestDetails);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!OrganizerRequestDetails && organizerId) {
          setLoading(true);
          const result = await fetchOrganizerRequestDetails(organizerId);
          if (result.data) {
            setOrganizerRequestDetails(result.data);
          } else {
            setError("No details found for the organizer request.");
          }
        }
      } catch (err) {
        setError("An error occurred while fetching the details.");
        console.error("Error fetching organizer details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [OrganizerRequestDetails, organizerId, fetchOrganizerRequestDetails]);

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClickOpenAccept = () => {
    setOpenAccept(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseAccept = () => {
    setOpenAccept(false);
  };

  const handleAcceptOrganizer = async () => {
    try {
      const data = await acceptOrganizer(organizerId);
      setMessage(data.message);
      navigate("/organizers");
    } catch (error) {
      console.error("Error accepting organizer:", error);
    } finally {
      setOpenAccept(false);
    }
  };

  const handleRefuseOrganizer = async () => {
    try {
      const data = await RefuseOrganizer(organizerId);
      setMessage(data.message);
      navigate("/organizers");
    } catch (error) {
      console.error("Error refusing organizer:", error);
    } finally {
      setOpenDelete(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" color="textSecondary">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!OrganizerRequestDetails) {
    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6" color="textSecondary">
          No details found for the organizer request.
        </Typography>
      </Box>
    );
  }

  const tableData = [
    { label: "Gender", value: OrganizerRequestDetails.gender || "-" },
    { label: "Phone Number", value: OrganizerRequestDetails.phone_number || "-" },
    { label: "Age", value: OrganizerRequestDetails.age || "-" },
    { label: "Years of Experience", value: OrganizerRequestDetails.years_of_experience || "-" },
    { label: "Previous Companies", value: OrganizerRequestDetails.previous_companies || "-" },
  ];

  return (
    <Box sx={{ padding: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Header text="Organizers CV" />
        <Box sx={{ display: "flex", gap: "10px" }}>
          <Button
            variant="contained"
            startIcon={<PersonRemove />}
            onClick={handleClickOpenDelete}
            color="error"
          >
            Refuse
          </Button>
          <CustomDialog
            open={openDelete}
            handleClose={handleCloseDelete}
            handelAgree={handleRefuseOrganizer}
            content="Are you sure you want to refuse this request?"
          />
          {message && <AutohideSnackbar message={message} />}
          <Button
            startIcon={<HowToReg />}
            variant="contained"
            sx={{ backgroundColor: "rgb(32,94,97)" }}
            onClick={handleClickOpenAccept}
          >
            Accept
          </Button>
          <CustomDialog
            open={openAccept}
            handleClose={handleCloseAccept}
            handelAgree={handleAcceptOrganizer}
            content="Are you sure you want to accept this request?"
          />
          {message && <AutohideSnackbar message={message} />}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "20px",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        <CustomCardCV card={OrganizerRequestDetails} />
        <CustomTableCV tableData={tableData} />
      </Box>
      <Header text="Organizer's Evidence" />
      <ImageList proofs={OrganizerRequestDetails.proofs || []} />
    </Box>
  );
};

export default OrganizerDetailsRequest;
