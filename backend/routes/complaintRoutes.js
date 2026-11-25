const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const { createComplaint, getComplaints, updateComplaintStatus } = require("../controllers/complaintController");

router.post("/", verifyToken, createComplaint);
router.get("/", verifyToken, getComplaints);
router.patch("/:id/status", verifyToken, authorizeRoles("admin", "faculty"), updateComplaintStatus);

module.exports = router;
