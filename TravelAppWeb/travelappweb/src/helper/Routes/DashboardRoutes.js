import { Routes, Route } from "react-router-dom";
import NotAuthorized from "../../Pages/Error/NotAuthorized";
import { Login } from "@mui/icons-material";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import PageNotFound from "../../Pages/Error/PageNotFound";
import { useContext } from "react";
import { AuthLogin } from "../../Context/login_context";
import dashboardPages from "./DashboardPages";

const DashboardRoutes = () => {
  const { isLoggedIn } = useContext(AuthLogin);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {false ? (
        <Route path="/" element={<DashboardLayout />}>
          {dashboardPages.map((page) => (
            <Route path={page.path} element={page.element} />
          ))}
        </Route>
      ) : (
        <Route path="/" element={<NotAuthorized />}>
          {dashboardPages.map((page) => (
            <Route path={page.path} />
          ))}
        </Route>
      )}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default DashboardRoutes;
