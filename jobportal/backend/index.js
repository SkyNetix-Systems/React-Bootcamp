// Import Express framework to create the server and APIs
import express from "express";

// Middleware to parse cookies from incoming HTTP requests
import cookieParser from "cookie-parser";

// Middleware to enable Cross-Origin Resource Sharing (CORS)
import cors from "cors";

// Loads environment variables from .env file into process.env
import dotenv from "dotenv";

// Custom function to connect to MongoDB database
import connectDB from "./utils/db.js";

// Import route handlers for different resources
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Initialize environment variables (e.g., PORT, DB_URL, JWT_SECRET)
dotenv.config({});

// Create Express app instance
const app = express();

// --------------------
// Global Middlewares
// --------------------

// Parses incoming JSON requests (req.body)
app.use(express.json());

// Parses URL-encoded form data (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));

// Enables reading cookies from request headers
app.use(cookieParser());

// CORS configuration: allow frontend running on this origin
const corsOptions = {
  origin: "http://localhost:5173", // Frontend URL (Vite dev server)
  credentials: true, // Allow cookies/auth headers to be sent
};

// Enable CORS with the above options
app.use(cors(corsOptions));

// Server port (use env value in production or default to 3000)
const PORT = process.env.PORT || 3000;

// --------------------
// API Routes
// --------------------

// User-related APIs (register, login, profile, etc.)
app.use("/api/v1/user", userRoute);

// Company-related APIs (create company, update info, etc.)
app.use("/api/v1/company", companyRoute);

// Job-related APIs (post job, list jobs, etc.)
app.use("/api/v1/job", jobRoute);

// Application-related APIs (apply for job, view applications, etc.)
app.use("/api/v1/application", applicationRoute);

// --------------------
// Start Server
// --------------------

// Start Express server and connect to database
app.listen(PORT, () => {
  connectDB(); // Connect to MongoDB when server starts
  console.log(`Server running at port ${PORT}`);
});
