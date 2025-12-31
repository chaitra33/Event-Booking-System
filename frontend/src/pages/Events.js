import { useEffect, useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
        alert("Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // ✅ BOOK EVENT HANDLER
  const handleBook = async (event) => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to book an event");
      window.location.href = "/login";
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/bookings",
        { eventId: event._id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Event booked successfully");
      window.location.reload();
    } catch (err) {
      alert(err.response?.data?.message || "Booking failed");
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <PageWrapper>
      <h1 className="page-title">Event Booking Website</h1>

      <div className="events-grid">
        {events.length === 0 ? (
          <p>No events found</p>
        ) : (
          events.map((event) => (
            <div className="event-card" key={event._id}>
              <h3>{event.title}</h3>
              <p>{event.location}</p>
              <p>{new Date(event.date).toDateString()}</p>

              <p className="price">
                {event.price > 0 ? `₹${event.price}` : "Free"}
              </p>

              <p className="seats">
                Seats Left: {event.availableSeats}
              </p>

              {/* ✅ BOOK BUTTON */}
              <button
                className="primary"
                disabled={event.availableSeats === 0}
                onClick={() => handleBook(event)}
              >
                {event.availableSeats === 0 ? "Full" : "Book Event"}
              </button>
            </div>
          ))
        )}
      </div>
    </PageWrapper>
  );
}
