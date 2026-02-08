import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDb } from "./connect.js";

const router = express.Router();

// POST /users/register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const db = getDb();

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashed,
      createdAt: new Date(),
    });

    res.json({ message: "User registered", userId: result.insertedId });
  } catch (err) {
    console.error("REGISTER ERROR:", err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// POST /users/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = getDb();

    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "supersecret",
      { expiresIn: "7d" },
    );

    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({ message: "Login failed" });
  }
});

export default router;
