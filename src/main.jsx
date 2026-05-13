import { createRoot } from "react-dom/client";
import Login from "./Pages/Login.jsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Register from "./Pages/Register.jsx";
import HomePage from "./Pages/Home.jsx";
import AuthContextComp from "./store/AuthContext.jsx";
import DashboardPage from "./Pages/Dashboard.jsx";
import Protector from "./Components/Protector.jsx";
import AdminOrdersPage from "./Pages/AdminOrders.jsx";
import NavbarComp from "./Components/Navbar.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  //   {/* <App /> */}
  //   <Login />
  // </StrictMode>
  <AuthContextComp>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomePage />} />
        <Route
          path="/dashboard"
          element={
            <Protector>
              <NavbarComp />
              <DashboardPage />
            </Protector>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <Protector>
              <NavbarComp />
              <AdminOrdersPage />
            </Protector>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthContextComp>,
);
