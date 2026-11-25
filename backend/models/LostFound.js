const mongoose = require("mongoose");

const lostFoundSchema = new mongoose.Schema(
    {
        itemName: { type: String, required: true, trim: true },
        description: { type: String, required: true },
        type: { type: String, enum: ["Lost", "Found"], required: true },
        location: { type: String, required: true },
        contactInfo: { type: String, required: true },
        status: { type: String, enum: ["Open", "Claimed"], default: "Open" },
        reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("LostFound", lostFoundSchema);
