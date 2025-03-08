const express = require("express");
const session = require("express-session");
const svgCaptcha = require("svg-captcha");
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Allow frontend requests
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Generate CAPTCHA
app.get("/captcha", (req, res) => {
    const captcha = svgCaptcha.create({
        size: 6, noise: 2, color: true, background: "#ccf2ff"
    });

    req.session.captcha = captcha.text; // Store in session
    res.type("svg").send(captcha.data);
});

// Verify CAPTCHA
app.post("/verify", (req, res) => {
    const { captcha } = req.body;
    if (captcha === req.session.captcha) {
        res.json({ success: true, message: "✅ CAPTCHA verified!" });
    } else {
        res.json({ success: false, message: "❌ Incorrect CAPTCHA. Try again." });
    }
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
