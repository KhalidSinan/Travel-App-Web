import Admins from "../../Pages/Admins/Admins";
import AddAdmin from "../../Pages/Admins/AddAdmin/AddAdmin";
import Organizers from "../../Pages/Organizers/organizers";
import OrganizersDetails from "../../Pages/Organizers/OrganizersList/organizersDetails";
import AllRequest from "../../Pages/Organizers/RequestsOrganizers/all_request";
import OrganizerDetailsRequest from "../../Pages/Organizers/RequestsOrganizers/organizer_details_request";
import OrganizersFullDetails from "../../Pages/Organizers/OrganizersList/organizersFullDetails";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import NotificationsPage from "../../Pages/Notifications/NotificationsPage";




const dashboardPages = [
    {path: "/",element: <Dashboard />},
    {path: "admins",element: <Admins />},
    {path: "addAdmin",element: <AddAdmin />},
    {path: "Organizers",element: <Organizers />},
    {path: "OrganizersDetails",element: <OrganizersDetails />},
    {path: "OrganizersFullDetails",element: <OrganizersFullDetails />},
    {path: "AllRequest",element: <AllRequest />},
    {path: "OrganizerDetailsRequest",element: <OrganizerDetailsRequest />},
    {path: "Notifications",element: <NotificationsPage />},
];

export default dashboardPages;