// controllers/hotel.js
import Hotel from "../models/hotel.js";
import formidable from "formidable";
import fs from "fs";

export const create = async (req, res) => {
    let form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("Form parse error:", err);
            return res.status(400).json({ error: "Image could not be uploaded" });
        }

        const { title, content, location, price, from, to, bed } = fields;

        // ✅ Basic validation
        if (!title || !content || !location || !price || !from || !to || !bed) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            let hotel = new Hotel({
                ...fields,
                postedBy: req.user._id // 🆕 set user ID from auth middleware
            });

            // If an image is uploaded
            if (files.image) {
                hotel.image.data = fs.readFileSync(files.image.filepath);
                hotel.image.contentType = files.image.mimetype;
            }

            await hotel.save();
            res.json({ success: true, hotel });
        } catch (saveErr) {
            console.error("Save error:", saveErr);
            res.status(400).json({ error: "Error saving hotel" });
        }
    });
};
