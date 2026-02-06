import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

// Create a MongoClient with Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

export const connectToServer = async () => {
  if (!database) {
    await client.connect();
    database = client.db("blogData");
    console.log("✅ Connected to MongoDB Atlas");
  }
  return database;
};

export const getDb = () => {
  if (!database) {
    throw new Error(
      "❌ Database not initialized. Call connectToServer() first.",
    );
  }
  return database;
};

/**
 * Default export (for compatibility)
 */
export default {
  connectToServer,
  getDb,
};
