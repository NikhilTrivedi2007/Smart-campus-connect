const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const { createEvent, getEvents, rsvpEvent } = require("../controllers/eventController");

router.post("/", verifyToken, authorizeRoles("admin", "faculty"), createEvent);
router.get("/", verifyToken, getEvents);
router.post("/:id/rsvp", verifyToken, rsvpEvent);

module.exports = router;
