import express from "express";
import { createHotel, hotels, hotelImage } from "../controllers/hotel.js";
import { requireSignin } from "../middlewares/index.js";

const router = express.Router();

router.get("/hotels", hotels);
router.post("/create-hotel", requireSignin, createHotel);
router.get("/hotel-image/:hotelId", hotelImage);

export default router;
