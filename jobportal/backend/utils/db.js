// Import mongoose ODM to connect and interact with MongoDB
import mongoose from "mongoose";

// Async function to establish connection with MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using connection string from environment variables
    await mongoose.connect(process.env.MONGO_URI);

    // Log success message when DB is connected
    console.log("MongoDB connected successfully ✅");
  } catch (error) {
    // Log any connection error
    console.error("MongoDB connection failed ❌", error);

    // Exit the process if DB connection fails (prevents running app without DB)
    process.exit(1);
  }
};

// Export the function to use in server.js / app.js
export default connectDB;
