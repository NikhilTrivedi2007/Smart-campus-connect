require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));
app.use("/api/lostfound", require("./routes/lostFoundRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/notices", require("./routes/noticeRoutes"));
app.use("/api/ai", require("./routes/aiRoutes"));

app.get("/", (req, res) => {
    res.send("AI Smart Campus Connect API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
