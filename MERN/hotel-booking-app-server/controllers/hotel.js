import Hotel from "../models/hotel.js";
import formidable from "formidable";
import fs from "fs";

export const create = async (req, res) => {
    let form = formidable({ multiples: false, keepExtensions: true });

    form.parse(req, async (err, fields, files) => {
        if (err) {
            console.error("❌ Form parse error:", err);
            return res.status(400).json({ error: "Image could not be uploaded" });
        }

        console.log("📩 Incoming FIELDS:", fields);
        console.log("📂 Incoming FILES:", files);

        const { title, content, location, price, from, to, bed } = fields;

        if (!title?.trim() || !content?.trim() || !location?.trim() || !price || !from || !to || !bed) {
            return res.status(400).json({ error: "All fields are required" });
        }

        try {
            let hotel = new Hotel({
                title: title.trim(),
                content: content.trim(),
                location: location.trim(),
                price: Number(price),
                from,
                to,
                bed: Number(bed),
                postedBy: req.user._id, // backend sets user
            });

            if (files.image) {
                const filePath = files.image.filepath || files.image.path;
                hotel.image.data = fs.readFileSync(filePath);
                hotel.image.contentType = files.image.mimetype || files.image.type;
            }

            await hotel.save();
            console.log("✅ Hotel saved:", hotel._id);
            res.json({ success: true, hotel });
        } catch (saveErr) {
            console.error("❌ Save error:", saveErr);
            res.status(400).json({ error: "Error saving hotel" });
        }
    });
};
