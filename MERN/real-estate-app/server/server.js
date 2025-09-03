import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from "dotenv";
import connectDB from './config/db.js';
dotenv.config(); // Load .env into process.env

// Access variables
const PORT = process.env.PORT || 3000;

const app = express();
connectDB();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/api', (req, res) => {
    res.json({
        data: 'Hello from nodejs api'
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

