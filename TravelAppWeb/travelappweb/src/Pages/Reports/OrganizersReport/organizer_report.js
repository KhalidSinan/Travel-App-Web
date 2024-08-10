import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";
import AccordionCard from "../Component/custom_card_report";
import CustomPagination from "../../../helper/custom_pagination";
import ReportContext from "../../../Context/report_context";

const ITEMS_PER_PAGE = 6;

const TextFieldStyle = {
  "& .MuiInputLabel-root": {
    color: "var(--secondary-color)",
    fontWeight: "bold",
    "&.Mui-focused": {
      color: "var(--secondary-color)", 
    },
  },
  "& .MuiOutlinedInput-root": {
    marginBottom: "12px",
    transitionDuration: "400ms",
    color: "var(--text-color)",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary-color)",
      borderWidth: "3px",
      borderRadius: "10px",
      "& fieldset": {
        borderColor: "var(--primary-color)",
      },
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "gray",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "var(--primary-color)",
      borderRadius: "10px",
    },
    "& .MuiSelect-icon": {
      color: "var(--secondary-color)",
    },
  },
};

const datePickerStyles = {
  "& .MuiInputBase-root": {
    color: "rgb(30, 136, 229", // Initial text color red
  },
  "& .MuiInputLabel-root": {
    color: "rgb(30, 136, 229", // Initial label color red
  },
};

const AppReport = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [error, setError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState("");
  const {
    page,
    handleChangePage,
    data,
    count,
    loading,
    fetchDataOrganizer,
    deleteReport,
    fetchReply,
  } = useContext(ReportContext);

  useEffect(() => {
    console.log(message);
  }, [message]);

  const handleDateChange = () => {
    if (startDate && endDate) {
      const formattedStartDate = format(startDate, "MM/dd/yyyy");
      const formattedEndDate = format(endDate, "MM/dd/yyyy");
      // setError("");
      fetchDataOrganizer(page, formattedStartDate, formattedEndDate);
      setOpenDialog(false);
    } else {
      setError("Please select both start and end dates.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteReport(id);
      console.log(result);
      setMessage(result.message);
      fetchDataOrganizer(page, startDate, endDate);
    } catch (error) {
      console.error("Error deleting report:", error);
    }
  };

  const handleEmail = async (id) => {
    try {
      const result = await fetchReply(id);
      console.log(result);
      setMessage(result.message || "Email sent successfully");
      fetchDataOrganizer(page, startDate, endDate);
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("Failed to send email");
    }
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box sx={{ maxWidth: 900, margin: "auto", marginBottom: 4 }}>
          <Button
            variant="contained"
            onClick={() => setOpenDialog(true)}
            sx={{
              marginBottom: 2,
              position: "absolute",
              top: 16,
              right: 16,
              backgroundColor: "var(--primary-color)",
              color: "white",
            }}
          >
            Show Filters
          </Button>

          <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            sx={{ position: "absolute", top: 15, right: 16 }}
          >
            <DialogTitle>Filter Reports</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(date) => setStartDate(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      fullWidth
                      sx={{ ...TextFieldStyle, ...datePickerStyles }}
                    />
                  )}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(date) => setEndDate(date)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      fullWidth
                      sx={{ ...TextFieldStyle, ...datePickerStyles }}
                    />
                  )}
                />
              </Box>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpenDialog(false)}
                sx={{ color: "var(--primary-color)" }}
              >
                Cancel
              </Button>

              <Button
                onClick={handleDateChange}
                variant="contained"
                sx={{ backgroundColor: "var(--primary-color)", color: "white" }}
              >
                Apply Filter
              </Button>
            </DialogActions>
          </Dialog>

          {/* Display error message if any */}
          {error && (
            <Box sx={{ marginTop: 2 }}>
              <Alert severity="error">{error}</Alert>
            </Box>
          )}
        </Box>
      </LocalizationProvider>
      <Box sx={{ maxWidth: 800, margin: "auto" }}>
        {loading ? (
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
        ) : data.length === 0 ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "80vh",
            }}
          >
            <Alert severity="info">No reports found</Alert>
          </Box>
        ) : (
          data.map((report, index) => (
            <Box key={index} sx={{ marginBottom: 2 }}>
              <AccordionCard
                senderName={report.user}
                reportTitle={report.report_title}
                reportBody={report.report_message}
                reportDate={report.sent_at}
                onDelete={() => handleDelete(report.id)}
                repliedTo={report.replied_to}
                onEmail={() => handleEmail(report.id)}
                message={message}
              />
            </Box>
          ))
        )}
      </Box>
      <CustomPagination
        count={Math.ceil(count / ITEMS_PER_PAGE)}
        page={page}
        onChange={(event, value) => handleChangePage(value)}
      />
    </>
  );
};

export default AppReport;
