import express from 'express'
import { config } from 'dotenv';
import morgan from "morgan";
import appRouter from './routes/index.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
config(); // Used to load the environment variables

const app = express();

// middlewares
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));  // Cookie-Parser is used to set cookies from backend to frontend

// Remove it when production
app.use(morgan("dev"));
app.use("/api/v1", appRouter);

export default app;