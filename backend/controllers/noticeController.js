const Notice = require("../models/Notice");

exports.createNotice = async (req, res) => {
    try {
        const { title, content, summary, targetAudience } = req.body;
        const notice = await Notice.create({
            title,
            content,
            summary: summary || content.slice(0, 100) + "...",
            targetAudience,
            postedBy: req.user.id
        });
        res.status(201).json(notice);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getNotices = async (req, res) => {
    try {
        const notices = await Notice.find()
            .populate("postedBy", "name role")
            .sort({ createdAt: -1 });
        res.json(notices);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
