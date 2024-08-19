import "./App.css";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { OrganizersProvider } from "./Context/organizers_context.js";
import AuthLoginProvider, { AuthLogin } from "./Context/login_context.js";
import { useContext, useEffect } from "react";
import DashboardRoutes from "./helper/Routes/DashboardRoutes.js";
import { ReportProvider } from "./Context/report_context.js";
import { DashboardProvider } from "./Context/dashboard_context.js";
import NotAuthorized from "./Pages/Error/NotAuthorized.js";
import { useLocalStorage } from "@uidotdev/usehooks";

// export const baseUrl = 'https://16f9-149-34-244-136.ngrok-free.app';
export const baseUrl = 'http://localhost:5000';

function App() {
  function clearStorage() {
    let session = sessionStorage.getItem('register');
    if (session == null) {
      window.localStorage.clear();
    }
    sessionStorage.setItem('register', 1);
  }
  window.addEventListener('load', clearStorage);
  return (
    <AuthLoginProvider>
      <DashboardProvider>
        <OrganizersProvider>
          <ReportProvider>
            <div className="App">
              <BrowserRouter>
                <DashboardRoutes />
              </BrowserRouter>
            </div>
          </ReportProvider>
        </OrganizersProvider>
      </DashboardProvider>
    </AuthLoginProvider>
  );
}

export default App;
