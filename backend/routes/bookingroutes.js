const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createBooking,
  getMyBookings,
  cancelBooking,
  getAllBookings
} = require("../controllers/bookingcontrollers");

// USER: CREATE BOOKING
router.post("/", authMiddleware, createBooking);

// USER (AND ADMIN): GET MY BOOKINGS
router.get("/my", authMiddleware, getMyBookings);

// USER (AND ADMIN): CANCEL BOOKING
router.delete("/:id", authMiddleware, cancelBooking);

// 👑 ADMIN: GET ALL BOOKINGS
router.get("/admin", authMiddleware, adminMiddleware, getAllBookings);

module.exports = router;
