import { useState } from "react";
import axios from "axios";
import PageWrapper from "../components/PageWrapper";

export default function CreateEvent() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    price: "",
    totalSeats: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/events",
        {
          ...form,
          price: Number(form.price),
          totalSeats: Number(form.totalSeats),
          availableSeats: Number(form.totalSeats)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Event created successfully");
      setForm({
        title: "",
        description: "",
        date: "",
        location: "",
        price: "",
        totalSeats: ""
      });
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create event");
    }
  };

  return (
    <PageWrapper>
      <div className="auth-container">
        <form className="auth-card" onSubmit={handleSubmit}>
          <h2>Create Event</h2>

          <input name="title" placeholder="Title" onChange={handleChange} required />
          <input name="description" placeholder="Description" onChange={handleChange} />
          <input name="date" type="date" onChange={handleChange} required />
          <input name="location" placeholder="Location" onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" onChange={handleChange} required />
          <input name="totalSeats" type="number" placeholder="Total Seats" onChange={handleChange} required />

          <button type="submit">Create Event</button>
        </form>
      </div>
    </PageWrapper>
  );
}
