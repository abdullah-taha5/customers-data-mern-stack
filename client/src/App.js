import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AddCustomer from "./pages/AddCustomer";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notifications from "./pages/Notifications";
import Register from "./pages/Register";
import Users from "./pages/Users";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            localStorage.getItem("token") ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/login"
          element={
            localStorage.getItem("token") ? <Navigate to="/" /> : <Login />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/addCustomer"
          element={
            localStorage.getItem("token") ? (
              <AddCustomer />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/chat"
          element={
            localStorage.getItem("token") ? <Chat /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/notifications"
          element={
            localStorage.getItem("token") ? (
              <Notifications />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/users"
          element={
            localStorage.getItem("token") ? <Users /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/ZGFzaGJvYXJk"
          element={
            localStorage.getItem("token") ? (
              <Dashboard />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
