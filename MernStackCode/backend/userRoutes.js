import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import database from "./connect.js";

dotenv.config();

const userRoutes = express.Router();
const SALT_ROUNDS = 6;

// #1 – Retrieve all users
// GET http://localhost:3000/users
userRoutes.get("/users", async (req, res) => {
  try {
    const db = database.getDb();
    const data = await db.collection("users").find({}).toArray();

    if (data.length > 0) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data was not found :(" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// #2 – Retrieve one user
// GET http://localhost:3000/users/:id
userRoutes.get("/users/:id", async (req, res) => {
  try {
    const db = database.getDb();
    const data = await db.collection("users").findOne({
      _id: new ObjectId(req.params.id),
    });

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Data was not found :(" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// #3 – Create one user (register)
// POST http://localhost:3000/users
userRoutes.post("/users", async (req, res) => {
  try {
    const db = database.getDb();

    const takenEmail = await db
      .collection("users")
      .findOne({ email: req.body.email });

    if (takenEmail) {
      return res.status(409).json({ message: "The email is taken" });
    }

    const hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    const mongoObject = {
      name: req.body.name,
      email: req.body.email,
      password: hash,
      joinDate: new Date(),
      posts: [],
    };

    const data = await db.collection("users").insertOne(mongoObject);
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// #4 – Update one user
// PUT http://localhost:3000/users/:id
userRoutes.put("/users/:id", async (req, res) => {
  try {
    const db = database.getDb();

    const update = {
      name: req.body.name,
      email: req.body.email,
      joinDate: req.body.joinDate,
      posts: req.body.posts,
    };

    // 🔐 Hash password only if it’s being updated
    if (req.body.password) {
      update.password = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    }

    const data = await db
      .collection("users")
      .updateOne({ _id: new ObjectId(req.params.id) }, { $set: update });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// #5 – Delete one user
// DELETE http://localhost:3000/users/:id
userRoutes.delete("/users/:id", async (req, res) => {
  try {
    const db = database.getDb();
    const data = await db.collection("users").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// #6 – Login (FIXED)
// POST http://localhost:3000/users/login
userRoutes.post("/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const db = database.getDb();

    // ✅ Find user
    const user = await db.collection("users").findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // ✅ Ensure secret exists
    if (!process.env.SECRETKEY) {
      throw new Error("JWT SECRETKEY is not defined");
    }

    // ✅ Sign JWT
    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.SECRETKEY,
      { expiresIn: "1h" },
    );

    // ✅ Success
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("LOGIN ERROR:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default userRoutes;
