import Admins from "../../Pages/Admins/Admins";
import AddAdmin from "../../Pages/Admins/AddAdmin/AddAdmin";
import Organizers from "../../Pages/Organizers/organizers";
import OrganizersDetails from "../../Pages/Organizers/OrganizersList/organizersDetails";
import AllRequest from "../../Pages/Organizers/RequestsOrganizers/all_request";
import OrganizerDetailsRequest from "../../Pages/Organizers/RequestsOrganizers/organizer_details_request";
import OrganizersFullDetails from "../../Pages/Organizers/OrganizersList/organizersFullDetails";
<<<<<<< HEAD
import ReportList from "../../Pages/Reports/reports";
=======
import Dashboard from "../../Pages/Dashboard/Dashboard";
import NotificationsPage from "../../Pages/Notifications/NotificationsPage";
import PushNotification from "../../Pages/Notifications/PushNotification/PushNotification";

>>>>>>> 6a875f44b36ac6c23520f9736d2a5c5fc8a84f9c



const dashboardPages = [
    {path: "/",element: <Dashboard />},
    {path: "admins",element: <Admins />},
    {path: "addAdmin",element: <AddAdmin />},
    {path: "Organizers",element: <Organizers />},
    {path: "OrganizersDetails",element: <OrganizersDetails />},
    {path: "OrganizersFullDetails",element: <OrganizersFullDetails />},
    {path: "AllRequest",element: <AllRequest />},
    {path: "OrganizerDetailsRequest",element: <OrganizerDetailsRequest />},
<<<<<<< HEAD
    {path : "Reports",element: <ReportList/>}
=======
    {path: "Notifications",element: <NotificationsPage />},
    {path: "pushNotification",element: <PushNotification />},
>>>>>>> 6a875f44b36ac6c23520f9736d2a5c5fc8a84f9c
];

export default dashboardPages;