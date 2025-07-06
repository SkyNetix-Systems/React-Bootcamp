import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("💚 MongoDB Atlas connected successfully");
    } catch (err) {
        console.error("❌ MongoDB connection failed:", err);
        process.exit(1); // exit with failure
    }
};

export default connectDB;
