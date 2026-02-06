// Import required tools from mongoose
// model  → to create MongoDB model
// Schema → to define schema structure
// ObjectId → to reference other collections
import { model, Schema, ObjectId } from "mongoose";

// Create User Schema
const schema = new Schema(
  {
    // Unique username for login/identity
    username: {
      type: String,
      trim: true, // removes extra spaces
      required: true, // mandatory field
      unique: true, // no duplicate usernames
      lowercase: true, // stores in lowercase
    },

    // Full name of the user
    name: {
      type: String,
      trim: true,
      default: "", // optional field
    },

    // User email (used for login / communication)
    email: {
      type: String,
      trim: true,
      required: true, // email is mandatory
      unique: true, // no duplicate emails
      lowercase: true,
    },

    // Encrypted password
    password: {
      type: String,
      required: true,
      maxLength: 256, // enough space for hashed passwords
    },

    // User address (simple string version)
    address: {
      type: String,
      default: "",
    },

    // Company name (useful for sellers / agents)
    company: {
      type: String,
      default: "",
    },

    // User phone number
    phone: {
      type: String,
      default: "",
    },

    // Profile photo (can store URL or object later)
    photo: {},

    // User roles for authorization
    role: {
      type: [String], // array to allow multiple roles
      default: ["Buyer"], // default role
      enum: ["Buyer", "Seller", "Admin"], // allowed roles only
    },

    // Properties the user has enquired about
    // References Ad collection
    enquiredProperties: [{ type: ObjectId, ref: "Ad" }],

    // Wishlist of properties
    // References Ad collection
    wishlist: [{ type: ObjectId, ref: "Ad" }],

    // Used for password reset / forgot password flow
    resetCode: {
      type: String,
      default: "",
    },
  },

  // Automatically adds createdAt & updatedAt fields
  { timestamps: true }
);

// Export User model
export default model("User", schema);
