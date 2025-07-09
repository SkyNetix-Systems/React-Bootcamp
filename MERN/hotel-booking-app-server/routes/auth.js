import express from 'express';
import { register } from '../controllers/register.js';
import { login } from '../controllers/Login.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;

