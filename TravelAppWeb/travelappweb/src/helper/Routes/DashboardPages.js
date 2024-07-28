import Admins from "../../Pages/Admins/Admins";
import AddAdmin from "../../Pages/Admins/AddAdmin/AddAdmin";
import Organizers from "../../Pages/Organizers/organizers";
import OrganizersDetails from "../../Pages/Organizers/OrganizersList/organizersDetails";
import AllRequest from "../../Pages/Organizers/RequestsOrganizers/all_request";
import OrganizerDetailsRequest from "../../Pages/Organizers/RequestsOrganizers/organizer_details_request";
import OrganizersFullDetails from "../../Pages/Organizers/OrganizersList/organizersFullDetails";
import ReportList from "../../Pages/Reports/reports";
import Dashboard from "../../Pages/Dashboard/Dashboard";
import NotificationsPage from "../../Pages/Notifications/NotificationsPage";
import PushNotification from "../../Pages/Notifications/PushNotification/PushNotification";
import Announcements from "../../Pages/Announcments/Announcements";
import MakeAnnouncement from "../../Pages/Announcments/MakeAnnouncement/MakeAnnouncement";
import NotAuthorized from "../../Pages/Error/NotAuthorized";
import PageNotFound from "../../Pages/Error/PageNotFound";
import Hotels from "../../Pages/Hotels/Hotels";
import HotelsContextProvider from "../../Context/hotels_context";
import HotelsDetails from "../../Pages/Hotels/HotelDetails/HotelsDetails";


const dashboardPages = [
    {path: "/",element: <Dashboard />},
    {path: "admins",element: <Admins />},
    {path: "addAdmin",element: <AddAdmin />},
    {path: "Organizers",element: <Organizers />},
    {path: "OrganizersDetails",element: <OrganizersDetails />},
    {path: "OrganizersFullDetails",element: <OrganizersFullDetails />},
    {path: "AllRequest",element: <AllRequest />},
    {path: "OrganizerDetailsRequest",element: <OrganizerDetailsRequest />},
    {path : "Reports",element: <ReportList/>},
    {path: "Notifications",element: <NotificationsPage />},
    {path: "pushNotification",element: <PushNotification />},
    {path: "Announcements",element: <Announcements />},
    {path: "makeAnnouncement",element: <MakeAnnouncement />},
    {path: "hotels",element: <HotelsContextProvider><Hotels /></HotelsContextProvider>},
    {path: "hotelDetails",element: <HotelsDetails />},
];

export default dashboardPages;