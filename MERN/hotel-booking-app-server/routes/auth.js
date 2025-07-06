import express from 'express';
import { echoMessage } from '../controllers/auth.js';

const router = express.Router();

router.get("/:message", echoMessage)

export default router;

