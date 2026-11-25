const { GoogleGenAI } = require("@google/genai");
const Event = require("../models/Event");
const Notice = require("../models/Notice");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

exports.askAssistant = async (req, res) => {
    try {
        const { question } = req.body;
        if (!question || !question.trim()) {
            return res.status(400).json({ message: "Question is required" });
        }

        const [events, notices] = await Promise.all([
            Event.find().sort({ date: 1 }).limit(5),
            Notice.find().sort({ createdAt: -1 }).limit(5)
        ]);

        const campusContext = `
You are the AI Campus Assistant for AI Smart Campus Connect.
Answer student and faculty questions clearly and concisely.
Use the live campus data below when relevant:

Upcoming Events:
${events.map((e) => `- ${e.title} on ${new Date(e.date).toDateString()} at ${e.venue}: ${e.description}`).join("\n") || "None"}

Recent Notices:
${notices.map((n) => `- ${n.title}: ${n.content}`).join("\n") || "None"}
`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `${campusContext}\nUser Question: ${question}`
        });

        res.status(200).json({ reply: response.text });
    } catch (error) {
        res.status(500).json({ message: "AI service error", error: error.message });
    }
};
