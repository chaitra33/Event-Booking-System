const Booking = require("../models/Booking");
const Event = require("../models/Event");



// CREATE BOOKING

exports.createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;

    if (!eventId) {
      return res.status(400).json({ message: "eventId is required" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // ❌ Prevent booking past events
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({
        message: "Cannot book an event that has already occurred"
      });
    }

    // ❌ No seats left
    if (event.availableSeats <= 0) {
      return res.status(400).json({ message: "Event is fully booked" });
    }

    // ❌ Prevent duplicate booking
    const existingBooking = await Booking.findOne({
      user: req.user.id,
      event: eventId
    });

    if (existingBooking) {
      return res.status(400).json({ message: "Event already booked" });
    }

    // ✅ CREATE BOOKING (IMPORTANT ORDER)
    const booking = new Booking({
      user: req.user.id,
      event: eventId
    });

    await booking.save();

    // ✅ Reduce available seats
    event.availableSeats -= 1;
    await event.save();

    res.status(201).json({
      message: "Event booked successfully",
      booking
    });
  } catch (error) {
    console.error("Create booking error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};


// ===============================
// GET MY BOOKINGS
// ===============================
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id
    }).populate("event");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// CANCEL BOOKING
// ===============================
// ❌ CANCEL BOOKING → RESTORE SEAT
exports.cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user.id;

    // 1️⃣ Find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 2️⃣ Ensure user owns the booking
    if (booking.user.toString() !== userId) {
      return res.status(403).json({
        message: "Not authorized to cancel this booking"
      });
    }

    // 3️⃣ Find related event
    const event = await Event.findById(booking.event);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // 4️⃣ (Optional) Prevent cancel after event date
    if (new Date(event.date) < new Date()) {
      return res.status(400).json({
        message: "Cannot cancel booking for past events"
      });
    }

    // 5️⃣ Delete booking
    await booking.deleteOne();

    // 6️⃣ Restore seat
    event.availableSeats += 1;
    await event.save();

    res.json({ message: "Booking cancelled and seat restored" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// 👑 ADMIN: GET ALL BOOKINGS
// ===============================
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("event");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
