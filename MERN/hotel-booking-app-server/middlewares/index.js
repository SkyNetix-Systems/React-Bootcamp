// middlewares/index.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id).select("_id name email");
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
};
