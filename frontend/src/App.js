import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getUserFromToken } from "./utils/auth";
import "./App.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import MyBookings from "./pages/MyBookings";
import AdminBookings from "./pages/AdminBookings";
import CreateEvent from "./pages/AdminCreateEvent";

import ProtectedRoute from "./auth/protectedRoute";
import AdminRoute from "./auth/AdminRoute";

function App() {
  const user = getUserFromToken();
  const isLoggedIn = !!user;
  const isAdmin = user?.isAdmin;

  return (
    <BrowserRouter>
      {/* ✅ NAVBAR (CSS controlled) */}
      <nav>
        <Link to="/">Events</Link>

        {isLoggedIn && <Link to="/bookings">My Bookings</Link>}

        {isAdmin && (
          <>
            <Link to="/admin/bookings">Admin Bookings</Link>
            <Link to="/admin/events">Create Event</Link>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isLoggedIn && (
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        )}
      </nav>

      {/* ✅ ROUTES */}
      <Routes>
        <Route path="/" element={<Events />} />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/events"
          element={
            <AdminRoute>
              <CreateEvent />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/bookings"
          element={
            <AdminRoute>
              <AdminBookings />
            </AdminRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
