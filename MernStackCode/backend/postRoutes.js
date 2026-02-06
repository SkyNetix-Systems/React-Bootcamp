import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import database from "./connect.js";

dotenv.config();

const postRoutes = express.Router();

// #1 – Retrieve all posts
// GET http://localhost:3000/posts
postRoutes.get("/posts", verifyToken, async (req, res) => {
  try {
    const db = database.getDb();
    const data = await db.collection("posts").find({}).toArray();

    // ✅ Always return 200 with array
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// #2 – Retrieve one post
// GET http://localhost:3000/posts/:id
postRoutes.get("/posts/:id", verifyToken, async (req, res) => {
  try {
    const db = database.getDb();
    const data = await db.collection("posts").findOne({
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

// #3 – Create one post
// POST http://localhost:3000/posts
postRoutes.post("/posts", verifyToken, async (req, res) => {
  try {
    const db = database.getDb();

    const mongoObject = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: req.body.user._id,
      dateCreated: req.body.dateCreated,
      imageId: req.body.imageId,
    };

    const data = await db.collection("posts").insertOne(mongoObject);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// #4 – Update one post
// PUT http://localhost:3000/posts/:id
postRoutes.put("/posts/:id", verifyToken, async (req, res) => {
  try {
    const db = database.getDb();

    const mongoObject = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        author: req.body.author,
        dateCreated: req.body.dateCreated,
        imageId: req.body.imageId,
      },
    };

    const data = await db
      .collection("posts")
      .updateOne({ _id: new ObjectId(req.params.id) }, mongoObject);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// #5 – Delete one post
// DELETE http://localhost:3000/posts/:id
postRoutes.delete("/posts/:id", verifyToken, async (req, res) => {
  try {
    const db = database.getDb();
    const data = await db.collection("posts").deleteOne({
      _id: new ObjectId(req.params.id),
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔐 JWT Middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid Token" });
    }

    req.body.user = user;
    next();
  });
}

export default postRoutes;
