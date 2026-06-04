import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";

import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import UserDashboard from "./pages/UserDashboard/UserDashboard";
import OwnerDashboard from "./pages/OwnerDashboard/OwnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/user"
          element={<UserDashboard />}
        />

        <Route
          path="/owner"
          element={<OwnerDashboard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;