import React from "react";
import Box from "@mui/material/Box";
import Tabs from "../../helper/tabs";
import OrganizersList from "./OrganizersList/organizersList";
import AllRequest from "./RequestsOrganizers/all_request";
import { OrganizersProvider } from "../../Context/organizers_context";

const Organizers = (props) => {
  return (
    <OrganizersProvider>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            width: "80%",
            height: "auto",
            marginTop: "20px",
            marginLeft: "30px",
            position: "relative",
            backgroundColor: "white",
            padding: "20px",
            zIndex: "1000",
          }}
        >
          <Box sx={{ bgcolor: "background.paper", borderRadius: 2 }}>
            <Tabs
              tab1="Organizers"
              tab2="Organizers Request"
              component1={<OrganizersList />}
              component2={<AllRequest />}
            />
          </Box>
        </div>
      </div>
    </OrganizersProvider>
  );
};

export default Organizers;
