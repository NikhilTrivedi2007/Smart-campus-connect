const Event = require("../models/Event");

exports.createEvent = async (req, res) => {
    try {
        const { title, description, date, venue, category } = req.body;
        const event = await Event.create({
            title,
            description,
            date,
            venue,
            category,
            createdBy: req.user.id
        });
        res.status(201).json(event);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find()
            .populate("createdBy", "name")
            .sort({ date: 1 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.rsvpEvent = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) return res.status(404).json({ message: "Event not found" });

        if (!event.attendees.includes(req.user.id)) {
            event.attendees.push(req.user.id);
            await event.save();
        }
        res.json({ message: "RSVP confirmed", attendeesCount: event.attendees.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
