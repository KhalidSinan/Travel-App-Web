import { Dashboard } from "@mui/icons-material";
import Admins from "../../Pages/Admins/Admins";
import AddAdmin from "../../Pages/Admins/AddAdmin/AddAdmin";
import Organizers from "../../Pages/Organizers/organizers";
import OrganizersDetails from "../../Pages/Organizers/OrganizersList/organizersDetails";
import AllRequest from "../../Pages/Organizers/RequestsOrganizers/all_request";
import OrganizerDetailsRequest from "../../Pages/Organizers/RequestsOrganizers/organizer_details_request";
import OrganizersFullDetails from "../../Pages/Organizers/OrganizersList/organizersFullDetails";
import ReportList from "../../Pages/Reports/reports";



const dashboardPages = [
    {path: "/",element: <Dashboard />},
    {path: "admins",element: <Admins />},
    {path: "addAdmin",element: <AddAdmin />},
    {path: "Organizers",element: <Organizers />},
    {path: "OrganizersDetails",element: <OrganizersDetails />},
    {path: "OrganizersFullDetails",element: <OrganizersFullDetails />},
    {path: "AllRequest",element: <AllRequest />},
    {path: "OrganizerDetailsRequest",element: <OrganizerDetailsRequest />},
    {path : "Reports",element: <ReportList/>}
];

export default dashboardPages;