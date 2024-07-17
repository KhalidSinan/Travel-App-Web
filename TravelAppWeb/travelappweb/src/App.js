import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./DashboardLayout/DashboardLayout.js";
import Admins from "./Pages/Admins/Admins.js";
import Login from "./Pages/Login/Login.js";
import Organizers from "./Pages/Organizers/organizers.js";
import OrganizersDetails from "./Pages/Organizers/OrganizersList/organizersDetails.js";
import OrganizersFullDetails from "./Pages/Organizers/OrganizersList/organizersFullDetails.js";
import OrganizerDetailsRequest from "./Pages/Organizers/RequestsOrganizers/organizer_details_request.js";
import AllRequest from "./Pages/Organizers/RequestsOrganizers/all_request.js";
import { OrganizersProvider } from "./Context/organizers_context.js";
function App() {
  return (
    <OrganizersProvider>
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
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
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
    </OrganizersProvider>
  );
}

export default App;
