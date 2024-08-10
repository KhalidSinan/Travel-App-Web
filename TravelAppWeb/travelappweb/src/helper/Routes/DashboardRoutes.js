import { Routes, Route, useNavigate } from "react-router-dom";
import NotAuthorized from "../../Pages/Error/NotAuthorized";
import DashboardLayout from "../Components/DashboardLayout/DashboardLayout";
import PageNotFound from "../../Pages/Error/PageNotFound";
import dashboardPages from "./DashboardPages";
import Login from "../../Pages/Login/Login";
import { AuthLogin } from "../../Context/login_context";
import { useContext, useEffect } from "react";

const DashboardRoutes = () => {
  const {isLoggedIn} = useContext(AuthLogin);
  const navigate = useNavigate();
  useEffect(() => {
    if(isLoggedIn){
      navigate('/dashboard');
    }else{
      navigate('/login');
    }
  },[isLoggedIn]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
<<<<<<< HEAD
      {true? (
=======
      {true ? (
>>>>>>> b31855f9840dec9790b988ff2a5e09cea32f7053
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
