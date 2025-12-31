import { useEffect, useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/bookings/admin",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        setBookings(res.data);
      } catch (err) {
        console.error("Admin bookings error:", err.response?.data || err.message);
        alert("Failed to load admin bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <p>Loading admin bookings...</p>;

  return (
    <PageWrapper>
      <h2>Admin Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Event</th>
              <th>Price</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td>{booking.user?.name || "Unknown"}</td>
                <td>{booking.user?.email || "N/A"}</td>
                <td>{booking.event?.title || "Event deleted"}</td>
                <td>
                  {booking.event
                    ? booking.event.price === 0
                      ? "Free"
                      : `₹${booking.event.price}`
                    : "N/A"}
                </td>
                <td>
                  {booking.event
                    ? new Date(booking.event.date).toDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PageWrapper>
  );
}
