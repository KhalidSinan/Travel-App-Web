import React, { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
} from "@mui/material";

const DateFilter = ({ setStartDate, setEndDate, fetchFlights }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(null);
  const [tempEndDate, setTempEndDate] = useState(null);
  const [error, setError] = useState(null);

  const handleDateChange = () => {
    if (tempStartDate && tempEndDate && tempStartDate > tempEndDate) {
      setError("Start date cannot be later than end date.");
    } else {
      setError(null);
      setStartDate(tempStartDate);
      setEndDate(tempEndDate);
      setOpenDialog(false);
      fetchFlights(); // Trigger fetching flights with new date range
    }
  };

  const TextFieldStyle = {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "var(--primary-color)",
      },
    },
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ maxWidth: 800, margin: "auto", marginBottom: 4 }}>
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
          sx={{ position: "absolute", top: 16, right: 16 }}
        >
          <DialogTitle>Filter Reports</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <DatePicker
                label="Start Date"
                value={tempStartDate}
                sx={TextFieldStyle}
                onChange={(date) => setTempStartDate(date)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
                    
                  />
                )}
              />
              <DatePicker
                label="End Date"
                value={tempEndDate}
                onChange={(date) => setTempEndDate(date)}
                sx={TextFieldStyle}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    fullWidth
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
  );
};

export default DateFilter;
