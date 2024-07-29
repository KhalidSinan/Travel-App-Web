import React, { useState, useContext, useEffect } from "react";
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
  Rating,
  Button,
  CircularProgress,
  styled,
  tableCellClasses,
} from "@mui/material";
import CustomDialog from "../../../helper/dialog";
import PersonRemove from "@mui/icons-material/PersonRemove";
import Report from "@mui/icons-material/Report";
import { DisabledByDefault } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import CustomPagination from "../../../helper/custom_pagination";
import Header from "../../../helper/typography";
import CustomCardCV from "../../../helper/card_cv";
import CustomTableCV from "../../../helper/table_cv";
import OrganizersContext from "../../../Context/organizers_context";
import ImageList from "../../../helper/imageList";
import AutohideSnackbar from "../../../helper/snackbar";
import { OrganizersProvider } from "../../../Context/organizers_context";
import CustomDialogAlert from "../../../helper/custom_dialog_alert";

const ITEMS_PER_PAGE = 2;

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    color: "var(--text-color)",
  },
  [`&.${tableCellClasses.body}`]: {
    color: "var(--text-color)",
  },
}));

const OrganizersDetails = () => {
  const { deleteOrganizer, deactiveOrganizer, alertOrganizer, fetchOrganizerDetails } =
    useContext(OrganizersContext) || {};

  const navigate = useNavigate();
  const location = useLocation();
  const { organizerId, initialOrganizerDetails, totalCount } = location.state || {};

  const [openDelete, setOpenDelete] = useState(false);
  const [openWarning, setOpenWarning] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [warningTitle, setWarningTitle] = useState("");
  const [warningBody, setWarningBody] = useState("");
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState("");
  const [organizerDetails, setOrganizerDetails] = useState(initialOrganizerDetails);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchOrganizerDetails(organizerId, page);
        setOrganizerDetails(data.data);
      } catch (error) {
        console.error("Error fetching organizer details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!initialOrganizerDetails) {
      fetchDetails();
    }
  }, [organizerId, page, initialOrganizerDetails, fetchOrganizerDetails]);

  const handleChangePage = async (value) => {
    setPage(value);
    setLoading(true);
    try {
      const data = await fetchOrganizerDetails(organizerId, value);
      setOrganizerDetails(data.data);
    } catch (error) {
      console.error("Error fetching organizer details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOrganizer = async () => {
    try {
      const data = await deleteOrganizer(organizerId);
      navigate("/organizers");
      setMessage(data.message);
    } catch (error) {
      console.error("Error deleting organizer:", error);
    } finally {
      setOpenDelete(false);
    }
  };

  const handleDetailsClick = async (tripId) => {
    navigate("/OrganizersFullDetails", {
      state: { tripId: tripId, organizerId: organizerId },
    });
  };

  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleClickOpenWarning = () => {
    setOpenWarning(true);
  };

  const handleClickOpenDeactivate = () => {
    setOpenDeactivate(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseWarning = () => {
    setOpenWarning(false);
  };

  const handleCloseDeactivate = () => {
    setOpenDeactivate(false);
  };

  const handleDeactivateOrganizer = async () => {
    try {
      const data = await deactiveOrganizer(organizerId);
      navigate("/organizers");
      setMessage(data.message);
    } catch (error) {
      console.error("Error deactivating organizer:", error);
    } finally {
      setOpenDeactivate(false);
    }
  };

  const handleAlertOrganizer = async () => {
    try {
      const data = await alertOrganizer(organizerId, warningTitle, warningBody);
      setMessage(data.message);
      const dataAfterWarning = await fetchOrganizerDetails(organizerId, page);
      setOrganizerDetails(dataAfterWarning.data);
      setOpenWarning(false);
    } catch (error) {
      console.error("Error alerting organizer:", error);
    } finally {
      setOpenDeactivate(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!organizerDetails) {
    return <div>No details found.</div>;
  }

  const tableData = [
    { label: "Gender", value: organizerDetails.gender || "-" },
    { label: "Phone Number", value: organizerDetails.phone || "-" },
    { label: "Age", value: organizerDetails.age || "-" },
    { label: "Number Of Trips", value: organizerDetails.num_of_trips || "-" },
    { label: "Years of Experience", value: organizerDetails.years_of_experience || "-" },
    {
      label: "Rating",
      value: (
        <Rating
          name="read-only"
          value={organizerDetails.rating || 0}
          readOnly
          precision={0.5}
        />
      ),
    },
    { label: "Reports Number", value: organizerDetails.num_of_reports || "-" },
    { label: "Warnings Number", value: organizerDetails.num_of_warnings || "-" },
    { label: "Previous Companies", value: organizerDetails.previous_companies || "-" },
  ];

  const tableTrip = organizerDetails.trips || [];

  return (
    <OrganizersProvider>
      <Box sx={{ padding: "20px" }}>
        <Box sx={{ padding: "20px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            <Header text="Organizers Details" />
            <Box sx={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                startIcon={<PersonRemove />}
                onClick={handleClickOpenDelete}
                color="error"
              >
                Delete Organizer
              </Button>
              <CustomDialog
                open={openDelete}
                handleClose={handleCloseDelete}
                handelAgree={handleDeleteOrganizer}
                content="Are you sure you want to delete the organizer?"
              />
              {message && <AutohideSnackbar message={message} />}
              <Button
                variant="contained"
                startIcon={<DisabledByDefault />}
                onClick={handleClickOpenDeactivate}
                sx={{ backgroundColor: "var(--primary-color)", color: "white" }}
              >
                Deactivate Organizer
              </Button>
              <CustomDialog
                open={openDeactivate}
                handleClose={handleCloseDeactivate}
                handelAgree={handleDeactivateOrganizer}
                content="Are you sure you want to deactivate the organizer?"
              />
              {message && <AutohideSnackbar message={message} />}
              <Button startIcon={<Report />} onClick={handleClickOpenWarning}>
                Send Warning
              </Button>
              <CustomDialogAlert
                open={openWarning}
                handleClose={handleCloseWarning}
                handleAgree={handleAlertOrganizer}
                content="Fill the following field to alert the organizer"
                title={warningTitle}
                setTitle={setWarningTitle}
                body={warningBody}
                setBody={setWarningBody}
              />
              {message && <AutohideSnackbar message={message} />}
            </Box>
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
          }}
        >
          <CustomCardCV card={organizerDetails} />
          <CustomTableCV tableData={tableData} />
        </Box>
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            marginBottom: "20px",
            fontWeight: "bold",
            color: "var(--primary-color)",
            alignItems: "flex-start",
          }}
        >
          Organizer's Evidence
        </Typography>
        <ImageList proofs={organizerDetails.proofs} />
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            marginBottom: "20px",
            marginTop: "10px",
            fontWeight: "bold",
            color: "var(--primary-color)",
            alignItems: "flex-start",
          }}
        >
          Organized Trips
        </Typography>
        <Box sx={{ marginTop: "20px" }}>
          {tableTrip.length === 0 ? (
            <Typography variant="h6" sx={{ textAlign: "center" }}>
              No trips found.
            </Typography>
          ) : (
            tableTrip.map((trip, tripIndex) => (
              <Paper
                key={tripIndex}
                sx={{ marginBottom: "20px", padding: "20px", backgroundColor: "var(--card-color)", color: "var(--text-color)" }}
              >
                <Typography variant="h6" sx={{ marginBottom: "10px" }}>
                  Trip {tripIndex + 1}
                </Typography>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        {Object.keys(trip)
                          .filter((key) => key !== "id")
                          .map((key) => (
                            <StyledTableCell key={key}>{key}</StyledTableCell>
                          ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {Object.keys(trip)
                          .filter((key) => key !== "id")
                          .map((key, cellIndex) => (
                            <StyledTableCell key={cellIndex}>{trip[key]}</StyledTableCell>
                          ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: "10px",
                  }}
                >
                  <Button
                    size="small"
                    style={{ color: "var(--secondary-color)" }}
                    onClick={() => handleDetailsClick(trip.id)}
                  >
                    Details
                  </Button>
                </Box>
              </Paper>
            ))
          )}
          <CustomPagination
            count={Math.ceil(totalCount / ITEMS_PER_PAGE)}
            page={page}
            onChange={(event, value) => handleChangePage(value)}
          />
        </Box>
      </Box>
    </OrganizersProvider>
  );
};

export default OrganizersDetails;
