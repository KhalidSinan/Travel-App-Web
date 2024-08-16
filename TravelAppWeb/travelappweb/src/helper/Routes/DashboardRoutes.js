import { Routes, Route, useNavigate,  } from "react-router-dom";
import NotAuthorized from "../../Pages/Error/NotAuthorized";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import PageNotFound from "../../Pages/Error/PageNotFound";
import dashboardPages from "./DashboardPages";
import Login from "../../Pages/Login/Login";
import { AuthLogin } from "../../Context/login_context";
import { useContext, useEffect } from "react";
import { BiSolidDashboard } from "react-icons/bi";
import {
  BsExclamationOctagonFill,
  BsFillPeopleFill,
  BsFillSendFill,
  BsHousesFill,
  BsPersonFill,
} from "react-icons/bs";
import { MdOutlineFlightTakeoff } from "react-icons/md";

const pages = [
  {
    index: 0,
    name: "Dashboard",
    icon: <BiSolidDashboard />,
    page: "/dashboard",
  },
  {
    index: 1,
    name: "Admins",
    icon: <BsPersonFill />,
    page: "/admins",
  },
  {
    index: 2,
    name: "Organizers",
    icon: <BsFillPeopleFill />,
    page: "/organizers",
  },
  {
    index: 3,
    name: "Announcements",
    icon: <BsFillSendFill />,
    page: "/announcements",
  },
  {
    index: 4,
    name: "Flights",
    icon: <MdOutlineFlightTakeoff />,
    page: "/flights",
  },
  {
    index: 5,
    name: "Hotels",
    icon: <BsHousesFill />,
    page: "/hotels",
  },
  {
    index: 6,
    name: "Reports",
    icon: <BsExclamationOctagonFill />,
    page: "/reports",
  },
];

const DashboardRoutes = () => {
  const { isLoggedIn } = useContext(AuthLogin);
  const navigate = useNavigate();
  useEffect(() => {
    const currentPage = localStorage.getItem("current-page");
    if (!isLoggedIn) {
      navigate("/login");
    } else if (isLoggedIn && currentPage == null) {
      navigate("/dashboard");
    } else if (isLoggedIn && currentPage !== -1) {
      navigate(pages[currentPage]["page"]);
    } else if (isLoggedIn && +currentPage === -1) {
      navigate("/Notifications");
    } else{
      navigate('/login');
    }
  }, [isLoggedIn]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {isLoggedIn ? (
        <Route path="/" element={<DashboardLayout />}>
          {dashboardPages.map((page) => (
            <Route key={page.path} path={page.path} element={page.element} />
          ))}
        </Route>
      ) : (
        <Route path="/" element={<NotAuthorized />}>
          {dashboardPages.map((page) => (
            <Route key={page.path} path={page.path} />
          ))}
        </Route>
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default DashboardRoutes;
