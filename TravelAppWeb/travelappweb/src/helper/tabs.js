// OrganizersTabs.js
import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { styled } from "@mui/system";
import { TabContext, TabList, TabPanel } from "@mui/lab";
const indicatorColor = "var(--primary-color)";
const inactiveColor = "grey";

const StyledTab = styled(Tab)(({ theme }) => ({
  "&.Mui-selected": {
    color: indicatorColor,
  },
  color: inactiveColor,
}));

const Tabs = ({ tab1, tab2, component1, component2 }) => {
  const [value, setValue] = useState("1");


  const handleChange = (event, newValue) => {
    setValue(newValue);
  
  };

  return (
    <Box sx={{ bgcolor: "var(--background)", borderRadius: 2 }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            ".MuiTabs-indicator": {
              backgroundColor: indicatorColor,
            },
          }}
        >
          <TabList onChange={handleChange} aria-label="Organizers tabs">
            <StyledTab label={tab1} value="1" />
            <StyledTab label={tab2} value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{component1}</TabPanel>
        <TabPanel value="2">{component2}</TabPanel>
      </TabContext>
    </Box>
  );
};

export default Tabs;
