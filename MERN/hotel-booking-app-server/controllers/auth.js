import User from "../models/user.js";

export const register = async (req, res) => {
    console.log("Body:", req.body);

    const { name, email, password } = req.body;

    // 🛡️ Basic input validation
    if (!name || name.trim().length < 2) {
        return res.status(400).json({ error: "Name is required and should be at least 2 characters long." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: "A valid email is required." });
    }

    if (!password || password.length < 6) {
        return res.status(400).json({ error: "Password is required and should be at least 6 characters long." });
    }

    try {
        // 🔎 Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email is already registered" });
        }

        // 💾 Create new user
        const user = new User({ name, email, password });
        await user.save();

        console.log("✅ User registered:", user);

        // 🔐 Return minimal user data (never password)
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.error("❌ Error registering user:", err);
        res.status(500).json({ error: "Server error. Try again later." });
    }
};
