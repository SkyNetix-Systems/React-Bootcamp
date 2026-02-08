import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { ObjectId } from "mongodb";
import database from "./connect.js";

dotenv.config();

const postRoutes = express.Router();

/**
 * #1 – Retrieve all posts (PUBLIC or PROTECTED - choose one)
 * GET http://localhost:3000/posts
 */
postRoutes.get("/posts", async (req, res) => {
  try {
    const db = database.getDb();
    const data = await db.collection("posts").find({}).toArray();

    return res.status(200).json(data); // always return array
  } catch (error) {
    console.error("GET /posts ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch posts" });
  }
});

/**
 * #2 – Retrieve one post
 * GET http://localhost:3000/posts/:id
 */
postRoutes.get("/posts/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    // Guard: invalid ObjectId
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const db = database.getDb();
    const data = await db.collection("posts").findOne({
      _id: new ObjectId(id),
    });

    if (!data) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("GET /posts/:id ERROR:", error);
    return res.status(500).json({ message: "Failed to fetch post" });
  }
});

/**
 * #3 – Create one post
 * POST http://localhost:3000/posts
 */
postRoutes.post("/posts", verifyToken, async (req, res) => {
  try {
    const db = database.getDb();

    const mongoObject = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      author: req.user?._id || null, // safer than req.body.user
      dateCreated: new Date(),
      imageId: req.body.imageId || null,
    };

    const result = await db.collection("posts").insertOne(mongoObject);

    return res.status(201).json({
      message: "Post created successfully",
      id: result.insertedId,
    });
  } catch (error) {
    console.error("POST /posts ERROR:", error);
    return res.status(500).json({ message: "Failed to create post" });
  }
});

/**
 * #4 – Update one post
 * PUT http://localhost:3000/posts/:id
 */
postRoutes.put("/posts/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const db = database.getDb();

    const update = {
      $set: {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        imageId: req.body.imageId,
        updatedAt: new Date(),
      },
    };

    const result = await db
      .collection("posts")
      .updateOne({ _id: new ObjectId(id) }, update);

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("PUT /posts/:id ERROR:", error);
    return res.status(500).json({ message: "Failed to update post" });
  }
});

/**
 * #5 – Delete one post
 * DELETE http://localhost:3000/posts/:id
 */
postRoutes.delete("/posts/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }

    const db = database.getDb();
    const result = await db.collection("posts").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("DELETE /posts/:id ERROR:", error);
    return res.status(500).json({ message: "Failed to delete post" });
  }
});

/**
 * 🔐 JWT Middleware
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token is missing" });
  }

  jwt.verify(token, process.env.SECRETKEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    // Attach user to request safely
    req.user = user;
    next();
  });
}

export default postRoutes;
