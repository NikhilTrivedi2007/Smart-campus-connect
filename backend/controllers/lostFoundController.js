const LostFound = require("../models/LostFound");

exports.createItem = async (req, res) => {
    try {
        const { itemName, description, type, location, contactInfo } = req.body;
        const item = await LostFound.create({
            itemName,
            description,
            type,
            location,
            contactInfo,
            reportedBy: req.user.id
        });
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await LostFound.find()
            .populate("reportedBy", "name email")
            .sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.markClaimed = async (req, res) => {
    try {
        const item = await LostFound.findByIdAndUpdate(
            req.params.id,
            { status: "Claimed" },
            { new: true }
        );
        if (!item) return res.status(404).json({ message: "Item not found" });
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
