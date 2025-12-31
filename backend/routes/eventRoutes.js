const express = require("express");
const router = express.Router();

const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

// ===============================
// CREATE EVENT (ADMIN ONLY)
// ===============================
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const event = new Event({
      ...req.body,
      createdBy: req.user.id
    });

    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===============================
// GET ALL EVENTS (PUBLIC)
// ===============================
router.get("/", async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

// ===============================
// GET SINGLE EVENT (PUBLIC)
// ===============================
router.get("/:id", async (req, res) => {
  const event = await Event.findById(req.params.id);
  res.json(event);
});

// ===============================
// UPDATE EVENT (ADMIN ONLY)
// ===============================
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      location,
      totalSeats
    } = req.body;

    const seats = Number(totalSeats);

    if (!seats || seats <= 0) {
      return res.status(400).json({ message: "Invalid totalSeats" });
    }

    const event = new Event({
  title: req.body.title,
  description: req.body.description,
  date: req.body.date,
  location: req.body.location,
  price: Number(req.body.price),
  totalSeats: Number(req.body.totalSeats),
  createdBy: req.user.id
});


    await event.save();
    res.status(201).json(event);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




// ============================\
// ===
// DELETE EVENT (ADMIN ONLY)
// ===============================
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);
  res.json({ message: "Event deleted successfully" });
});

module.exports = router;
