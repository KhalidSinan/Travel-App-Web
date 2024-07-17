import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./helper/Components/DashboardLayout/DashboardLayout.js";
import Login from "./Pages/Login/Login.js";
import Organizers from "./Pages/Organizers/organizers.js";
import OrganizersDetails from "./Pages/Organizers/OrganizersList/organizersDetails.js";
import OrganizersFullDetails from "./Pages/Organizers/OrganizersList/organizersFullDetails.js";
import OrganizerDetailsRequest from "./Pages/Organizers/RequestsOrganizers/organizer_details_request.js";
import AllRequest from "./Pages/Organizers/RequestsOrganizers/all_request.js";
import { OrganizersProvider } from "./Context/organizers_context.js";
import Admins from "./Pages/Admins/Admins.js";
import Dashboard from "./Pages/Dashboard/Dashboard.js";
import AddAdmin from "./Pages/Admins/AddAdmin/AddAdmin.js";

function App() {
  return (
    <OrganizersProvider>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="admins" element={<Admins />} />
            <Route path="/Organizers" element={<Organizers />} />
            <Route
              path="/OrganizersDetails"
              element={
                  <OrganizersDetails />
              }
            />
            <Route
              path="/OrganizersFullDetails"
              element={<OrganizersFullDetails />}
            />
            <Route path="/AllRequest" element={<AllRequest />} />
            <Route
              path="/OrganizerDetailsRequest"
              element={<OrganizerDetailsRequest />}
            />
            <Route path="addAdmin" element={<AddAdmin />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
    </OrganizersProvider>
  );
}

export default App;
