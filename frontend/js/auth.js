const API_URL = "http://localhost:5000/api/auth";

const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const msg = document.getElementById("authMessage");
        const payload = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            role: document.getElementById("role").value,
            password: document.getElementById("password").value
        };

        try {
            const res = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) {
                msg.style.color = "red";
                msg.textContent = data.message || "Registration failed";
                return;
            }
            msg.style.color = "green";
            msg.textContent = "Registration successful! Redirecting to login...";
            setTimeout(() => (window.location.href = "login.html"), 1200);
        } catch (err) {
            msg.style.color = "red";
            msg.textContent = "Could not connect to server.";
        }
    });
}

const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const msg = document.getElementById("authMessage");
        const payload = {
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value
        };

        try {
            const res = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) {
                msg.style.color = "red";
                msg.textContent = data.message || "Login failed";
                return;
            }
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            msg.style.color = "green";
            msg.textContent = "Login successful! Redirecting...";
            setTimeout(() => (window.location.href = "dashboard.html"), 1000);
        } catch (err) {
            msg.style.color = "red";
            msg.textContent = "Could not connect to server.";
        }
    });
}
