const chatForm = document.getElementById("chatForm");
const questionInput = document.getElementById("questionInput");
const chatMessages = document.getElementById("chatMessages");

function appendMessage(text, sender) {
    const div = document.createElement("div");
    div.className = `msg ${sender}`;
    div.textContent = text;
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return div;
}

chatForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = questionInput.value.trim();
    if (!question) return;

    appendMessage(question, "user");
    questionInput.value = "";

    const loadingMsg = appendMessage("Thinking...", "bot");

    try {
        const res = await fetch("http://localhost:5000/api/ai/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question })
        });
        const data = await res.json();
        loadingMsg.textContent = res.ok ? data.reply : (data.message || "Something went wrong.");
    } catch (err) {
        loadingMsg.textContent = "Could not reach the server.";
    }
});
