// models/hotel.js
import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const hotelSchema = new Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true, maxlength: 10000 },
    location: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    from: { type: Date, required: true },
    to: { type: Date, required: true },
    bed: { type: Number, required: true },
    image: {
        data: Buffer,
        contentType: String
    },
    postedBy: { type: ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Hotel", hotelSchema);
