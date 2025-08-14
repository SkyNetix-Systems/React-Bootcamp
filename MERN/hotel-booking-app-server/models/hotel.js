// models/hotel.js
import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const hotelSchema = new Schema({
    title: {
        type: String,
        required: "Title is required",
        trim: true
    },
    content: {
        type: String,
        required: "Content is required",
        trim: true,
        maxlength: 10000
    },
    location: {
        type: String,
        required: "Location is required",
        trim: true
    },
    price: {
        type: Number,
        required: "Price is required"
    },
    from: {
        type: Date,
        required: "From date is required"
    },
    to: {
        type: Date,
        required: "To date is required"
    },
    bed: {
        type: Number,
        required: "Number of beds is required"
    },
    image: {
        data: Buffer,         // Store file data (binary)
        contentType: String   // MIME type (e.g. image/jpeg)
    },
    postedBy: {
        type: ObjectId,       // Link to User who posted
        ref: "User"
    }
}, { timestamps: true }); // Auto adds createdAt & updatedAt

export default mongoose.model("Hotel", hotelSchema);
