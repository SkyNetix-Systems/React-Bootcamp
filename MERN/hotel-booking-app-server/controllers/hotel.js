import Hotel from "../models/hotel.js";

// Create hotel
export const createHotel = async (req, res) => {
    try {
        const hotel = new Hotel({ ...req.body, postedBy: req.user._id });

        if (req.file) {
            hotel.image.data = req.file.buffer;
            hotel.image.contentType = req.file.mimetype;
        }

        await hotel.save();
        res.json(hotel);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all hotels
export const hotels = async (req, res) => {
    try {
        const all = await Hotel.find({}).select("-image.data").populate("postedBy", "_id name");
        res.json(all);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Serve hotel image
export const hotelImage = async (req, res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId);
        if (!hotel || !hotel.image.data) return res.status(404).send("No image found");
        res.set("Content-Type", hotel.image.contentType);
        res.send(hotel.image.data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
