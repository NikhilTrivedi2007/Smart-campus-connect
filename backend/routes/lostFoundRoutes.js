const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/authMiddleware");
const { createItem, getItems, markClaimed } = require("../controllers/lostFoundController");

router.post("/", verifyToken, createItem);
router.get("/", verifyToken, getItems);
router.patch("/:id/claim", verifyToken, markClaimed);

module.exports = router;
