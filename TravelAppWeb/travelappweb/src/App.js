import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { OrganizersProvider } from "./Context/organizers_context.js";
import { AuthLogin } from "./Context/login_context.js";
import { useContext } from "react";
import DashboardRoutes from "./helper/Routes/DashboardRoutes.js";
import { ReportProvider } from "./Context/report_context.js";

function App() {
  const { isLoggedIn } = useContext(AuthLogin);
  return (
    <OrganizersProvider>
      <ReportProvider>
      <div className="App">
        <BrowserRouter>
          <DashboardRoutes />
        </BrowserRouter>
      </div>
      </ReportProvider>
    </OrganizersProvider>
  );
}

export default App;
