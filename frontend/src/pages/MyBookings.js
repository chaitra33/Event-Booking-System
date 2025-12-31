import { useEffect, useState } from "react";
import axios from "axios";

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/bookings/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setBookings(res.data);
    } catch (err) {
      alert("Failed to load bookings");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!window.confirm("Cancel this booking?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Booking cancelled");
      fetchBookings(); // refresh list

    } catch (err) {
      alert(err.response?.data?.message || "Cancel failed");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h3>{booking.event.title}</h3>
            <p>Date: {new Date(booking.event.date).toDateString()}</p>
            <p>Location: {booking.event.location}</p>

            <button
              onClick={() => cancelBooking(booking._id)}
              style={{ background: "red", color: "white", padding: "5px" }}
            >
              Cancel Booking
            </button>
          </div>
        ))
      )}
    </div>
  );
}
