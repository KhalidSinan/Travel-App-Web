import { Routes, Route } from "react-router-dom";
import NotAuthorized from "../../Pages/Error/NotAuthorized";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import PageNotFound from "../../Pages/Error/PageNotFound";
import dashboardPages from "./DashboardPages";
import Login from "../../Pages/Login/Login";
import { AuthLogin } from "../../Context/login_context";
import { useContext, useEffect } from "react";

const DashboardRoutes = () => {
  const {isLoggedIn} = useContext(AuthLogin);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      {true? (
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
