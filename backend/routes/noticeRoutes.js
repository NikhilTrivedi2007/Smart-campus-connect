const express = require("express");
const router = express.Router();
const { verifyToken, authorizeRoles } = require("../middleware/authMiddleware");
const { createNotice, getNotices } = require("../controllers/noticeController");

router.post("/", verifyToken, authorizeRoles("admin", "faculty"), createNotice);
router.get("/", verifyToken, getNotices);

module.exports = router;
