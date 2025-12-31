const mongoose = require("mongoose");


const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },

  // ✅ NEW: PRICE
  price: {
    type: Number,
    required: true,
    default: 0   // 0 = Free event
  },

  totalSeats: {
    type: Number,
    required: true
  },
  availableSeats: {
    type: Number,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
}, { timestamps: true });

module.exports = mongoose.model("Event", eventSchema);


module.exports = mongoose.model("Event", eventSchema);
