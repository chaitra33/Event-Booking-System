const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();



const app = express();
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));


app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Event Booking API Running");
});

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const bookingRoutes = require("./routes/bookingroutes"); 

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));


app.listen(5000, () => {
  console.log("Server running on port 5000");
});
