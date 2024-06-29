import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import DashboardLayout from "./DashboardLayout/DashboardLayout.js";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<DashboardLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
