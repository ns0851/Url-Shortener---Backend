import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/config/mongo.config.js';
import urlRouter from './src/routes/shortUrl.router.js'
import authRouter from './src/routes/auth.router.js'
import userRouter from './src/routes/get.router.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Get requests 
app.use('/api/view', userRouter)
app.use('/api/verify', authRouter)

// Post requests 
app.use('/api/auth', authRouter)
app.use('/api/create', urlRouter);
app.use('/', urlRouter);


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    connectDB();
    console.log("Listening on port: ", PORT);
})