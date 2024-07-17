import "./App.css";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Admins from "./Pages/Admins/Admins.js";
import Login from "./Pages/Login/Login.js";
import Dashboard from "./Pages/Dashboard/Dashboard.js";
import AddAdmin from "./Pages/Admins/AddAdmin/AddAdmin.js";
import DashboardLayout from "./helper/Components/DashboardLayout/DashboardLayout.js";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="admins" element={<Admins />} />
            <Route path="addAdmin" element={<AddAdmin />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
