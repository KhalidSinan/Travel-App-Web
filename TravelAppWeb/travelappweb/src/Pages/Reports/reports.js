import React from "react";
import AppReport from "./AppReport/app_report";
// import CustomPagination from "../../../helper/custom_pagination";
import OrganizerReport from "./OrganizersReport/organizer_report";
import { Box } from "@mui/material";
import Tabs from "../../helper/tabs";
// const ITEMS_PER_PAGE = 6;

const ReportList = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          width: "80%",
          height: "auto",
          marginTop: "20px",
          marginLeft: "30px",
          position: "relative",
          backgroundColor: "var(--background)",
          padding: "20px",
          zIndex: "1000",
        }}
      >
        <Box sx={{ borderRadius: 2, backgroundColor: "var(--background)" }}>
          <Tabs
            tab1="App Report"
            tab2="Organizers Report"
            component1={<AppReport />}
            component2={<OrganizerReport/>}
          />
        </Box>
      </div>
    </div>
  );
};

export default ReportList;
