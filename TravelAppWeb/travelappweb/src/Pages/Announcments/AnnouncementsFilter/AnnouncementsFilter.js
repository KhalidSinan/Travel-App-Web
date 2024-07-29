import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React, { useContext } from "react";
import TextFieldStyle from "../../../helper/Styles/TextFieldStyle";
import styles from './AnnouncementsFilter.module.css';
const AnnouncemenetsFilter = ({ showFilter, context }) => {
  const { changeStartDate, changeEndDate, startDate, endDate } =
    useContext(context);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div
        className={`${styles["date-filter"]} ${
          !showFilter ? styles["hide"] : ""
        }`}
      >
        <h3>Filter Announcements By Date</h3>
        <div className={styles["date-picker"]}>
          <DatePicker
            label="Start Date"
            value={startDate === "" ? null : startDate}
            onChange={(date) => changeStartDate(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="Standard"
                fullWidth
                sx={TextFieldStyle}
              />
            )}
          />
        </div>
        <div className={styles["date-picker"]}>
          <DatePicker
            label="End Date"
            value={endDate === "" ? null : endDate}
            onChange={(date) => changeEndDate(date)}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="Standard"
                fullWidth
                sx={TextFieldStyle}
              />
            )}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default AnnouncemenetsFilter;
