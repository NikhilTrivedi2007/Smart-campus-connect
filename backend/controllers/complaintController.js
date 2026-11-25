const Complaint = require("../models/Complaint");

exports.createComplaint = async (req, res) => {
    try {
        const { title, description, category } = req.body;
        const complaint = await Complaint.create({
            title,
            description,
            category,
            createdBy: req.user.id
        });
        res.status(201).json(complaint);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getComplaints = async (req, res) => {
    try {
        const filter = req.user.role === "student" ? { createdBy: req.user.id } : {};
        const complaints = await Complaint.find(filter)
            .populate("createdBy", "name email")
            .sort({ createdAt: -1 });
        res.json(complaints);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateComplaintStatus = async (req, res) => {
    try {
        const updated = await Complaint.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: "Complaint not found" });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
