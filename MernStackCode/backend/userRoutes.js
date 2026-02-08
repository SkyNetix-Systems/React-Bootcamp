import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import database from "./connect.js";

dotenv.config();
const userRoutes = express.Router();
const SALT_ROUNDS = 10;

userRoutes.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ success: false });

    const db = database.getDb();
    const user = await db.collection("users").findOne({ email });
    if (!user) return res.status(401).json({ success: false });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ success: false });

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRETKEY,
      { expiresIn: "1h" },
    );

    res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        joinDate: user.joinDate,
      },
    });
  } catch (e) {
    res.status(500).json({ success: false });
  }
});

export default userRoutes;
