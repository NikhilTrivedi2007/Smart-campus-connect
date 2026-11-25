const BASE_URL = "http://localhost:5000/api";
const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user") || "null");

if (!token || !user) {
    window.location.href = "login.html";
}

document.getElementById("userGreeting").textContent = `${user.name} (${user.role})`;

if (user.role === "admin" || user.role === "faculty") {
    document.querySelectorAll(".admin-only").forEach((el) => (el.style.display = "block"));
}

document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "login.html";
});

async function authFetch(endpoint, options = {}) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            ...(options.headers || {})
        }
    });
    if (res.status === 401) {
        localStorage.clear();
        window.location.href = "login.html";
    }
    return res.json();
}

document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        document.querySelectorAll(".tab-btn, .tab-panel").forEach((el) => el.classList.remove("active"));
        btn.classList.add("active");
        document.getElementById(btn.dataset.tab).classList.add("active");
    });
});

async function loadComplaints() {
    const data = await authFetch("/complaints");
    document.getElementById("complaintList").innerHTML = data
        .map((c) => `
            <div class="item-card">
                <span class="badge">${c.category}</span> <span class="badge">${c.status}</span>
                <h4>${c.title}</h4>
                <p>${c.description}</p>
            </div>
        `).join("");
}

document.getElementById("complaintForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await authFetch("/complaints", {
        method: "POST",
        body: JSON.stringify({
            title: document.getElementById("cTitle").value,
            category: document.getElementById("cCategory").value,
            description: document.getElementById("cDesc").value
        })
    });
    e.target.reset();
    loadComplaints();
});

async function loadLostFound() {
    const data = await authFetch("/lostfound");
    document.getElementById("lostFoundList").innerHTML = data
        .map((item) => `
            <div class="item-card">
                <span class="badge">${item.type}</span> <span class="badge">${item.status}</span>
                <h4>${item.itemName} — ${item.location}</h4>
                <p>${item.description}</p>
                <small>Contact: ${item.contactInfo}</small>
            </div>
        `).join("");
}

document.getElementById("lostFoundForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await authFetch("/lostfound", {
        method: "POST",
        body: JSON.stringify({
            itemName: document.getElementById("lfName").value,
            type: document.getElementById("lfType").value,
            location: document.getElementById("lfLocation").value,
            contactInfo: document.getElementById("lfContact").value,
            description: document.getElementById("lfDesc").value
        })
    });
    e.target.reset();
    loadLostFound();
});

async function loadEvents() {
    const data = await authFetch("/events");
    document.getElementById("eventList").innerHTML = data
        .map((ev) => `
            <div class="item-card">
                <span class="badge">${new Date(ev.date).toDateString()}</span>
                <h4>${ev.title} (${ev.venue})</h4>
                <p>${ev.description}</p>
            </div>
        `).join("");
}

document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await authFetch("/events", {
        method: "POST",
        body: JSON.stringify({
            title: document.getElementById("eTitle").value,
            date: document.getElementById("eDate").value,
            venue: document.getElementById("eVenue").value,
            description: document.getElementById("eDesc").value
        })
    });
    e.target.reset();
    loadEvents();
});

async function loadNotices() {
    const data = await authFetch("/notices");
    document.getElementById("noticeList").innerHTML = data
        .map((n) => `
            <div class="item-card">
                <span class="badge">${n.targetAudience}</span>
                <h4>${n.title}</h4>
                <p>${n.content}</p>
            </div>
        `).join("");
}

document.getElementById("noticeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    await authFetch("/notices", {
        method: "POST",
        body: JSON.stringify({
            title: document.getElementById("nTitle").value,
            content: document.getElementById("nContent").value
        })
    });
    e.target.reset();
    loadNotices();
});

loadComplaints();
loadLostFound();
loadEvents();
loadNotices();
