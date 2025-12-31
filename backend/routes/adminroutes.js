const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { makeAdmin } = require("../controllers/adminController");

// 👑 ONLY ADMINS CAN MAKE OTHER USERS ADMIN
router.put("/make-admin/:id", authMiddleware, adminMiddleware, makeAdmin);

module.exports = router;
