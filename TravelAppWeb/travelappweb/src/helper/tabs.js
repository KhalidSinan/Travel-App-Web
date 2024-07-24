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

const Tabs = ({ tab1, tab2,tab3, component1, component2,component3 }) => {
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
            {tab3 ? <StyledTab label={tab3} value="3" /> : null }
          </TabList>
        </Box>
        <TabPanel value="1" sx={{padding: 0}}>{component1}</TabPanel>
        <TabPanel value="2" sx={{padding: 0}}>{component2}</TabPanel>
        {tab3 ?<TabPanel value="3" sx={{padding: 0}}>{component3}</TabPanel> : null }
      </TabContext>
    </Box>
  );
};

export default Tabs;
