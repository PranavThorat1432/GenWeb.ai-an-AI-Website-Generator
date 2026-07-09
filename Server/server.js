import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './src/Config/mongoDB.js';
import authRouter from './src/Routes/authRoutes.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from './src/Routes/userRoutes.js';
import websiteRouter from './src/Routes/websiteRoutes.js';
import billingRouter from './src/Routes/billingRoutes.js';
import { stripeWebhook } from './src/Controllers/stripeWebhookController.js';
import { rateLimit } from 'express-rate-limit';

const app = express();

app.post('/api/stripe/webhook', express.raw({type: 'application/json'}), stripeWebhook);

const PORT = process.env.PORT || 5000;

// Global Rate Limiting (100 requests per 15 mins)
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 150,
    message: { message: 'Too many requests from this IP, please try again after 15 minutes.' },
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(globalLimiter);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Server is running...");
});

// Routes
app.use('/api/auth', authRouter)
app.use('/api/user', userRouter)
app.use('/api/website', websiteRouter)
app.use('/api/billing', billingRouter)


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is listening on http://localhost:${PORT}`);
});