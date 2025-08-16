import express from 'express';
import formidable from 'express-formidable';
import { requireSignin } from '../middlewares/index.js';
import { create } from '../controllers/hotel.js';

const router = express.Router();

router.post("/create-hotel", requireSignin, create);


export default router;

