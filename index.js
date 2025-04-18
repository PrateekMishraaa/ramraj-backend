import dotenv from 'dotenv';
dotenv.config(); // Always call this FIRST

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import Contact from "./routes/ContactForm.js";
import User from "./routes/User.js";

const app = express();
const PORT = process.env.PORT || 4000;

// CORS config
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5000',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use(express.json());
app.use('/api', Contact);
app.use('/api', User);

// DB connection
mongoose.connect(process.env.MONGOURI)
.then(() => console.log('Connected from database BABY'))
.catch(() => console.log('Disconnected ho gya bc'));

// Test route
app.get('/', (req, res) => {
    console.log("jai parshuram ji ki");
    res.send("baba pandit");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
