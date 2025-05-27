import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config()

const MongoDB_URL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(MongoDB_URL);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;