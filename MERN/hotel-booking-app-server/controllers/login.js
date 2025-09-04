import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No user found with this email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        const jwtSecret = process.env.JWT_SECRET || "superSecretSauceNoOneKnows123";
        const token = jwt.sign(
            { _id: user._id },
            jwtSecret,
            { expiresIn: "7d" }
        );

        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                seller_account_id: "",
                stripe_seller: { charges_enabled: false },
                stripeSession: {},
                // Add other fields here as needed
            },
            timestamp: new Date().toISOString(), // Add timestamp properly inside response
        });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Server error. Try again later." });
    }
};
