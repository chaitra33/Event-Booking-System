const cron = require("node-cron");
const Booking = require("../models/Booking");
const sendEmail = require("../utils/emailService");

// Runs every hour
cron.schedule("0 * * * *", async () => {
  console.log("⏰ Checking for upcoming events...");

  const now = new Date();
  const reminderTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const bookings = await Booking.find()
    .populate("user")
    .populate("event");

  for (const booking of bookings) {
    if (!booking.event || !booking.user) continue;

    const eventDate = new Date(booking.event.date);

    if (
      eventDate > now &&
      eventDate <= reminderTime
    ) {
      await sendEmail(
        booking.user.email,
        "⏰ Event Reminder",
        `
          <h2>Event Reminder</h2>
          <p>Your event is happening soon:</p>
          <p><strong>${booking.event.title}</strong></p>
          <p>Date: ${eventDate.toDateString()}</p>
          <p>Location: ${booking.event.location}</p>
        `
      );

      console.log(`📧 Reminder sent to ${booking.user.email}`);
    }
  }
});
