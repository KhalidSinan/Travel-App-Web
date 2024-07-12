import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashboardLayout from "./DashboardLayout/DashboardLayout.js";
import Admins from './Pages/Admins/Admins.js';
import Login from './Pages/Login/Login.js';
import Dashboard from './Pages/Dashboard/Dashboard.js';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="admins" element={<Admins />} />
            {/* Organizers Here */}
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
