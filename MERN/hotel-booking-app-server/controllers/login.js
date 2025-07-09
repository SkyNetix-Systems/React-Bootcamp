import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const login = async (req, res) => {
    console.log("Login body:", req.body);

    const { email, password } = req.body;

    // 🛡️ Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // 🔎 Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No user found with this email" });
        }

        // 🔐 Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        // 🎉 Success
        console.log("✅ Login successful for:", user.email);

        // Generate a jwt token
        const token = jwt.sign(
            { _id: user._id }, // payload
            process.env.JWT_SECRET, // secret key from .env
            { expiresIn: "7d" } // token validity
        );

        res.json({
            message: "Login successful",
            token, // send token to frontend
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        console.error("❌ Login error:", err);
        res.status(500).json({ error: "Server error. Try again later." });
    }
};
