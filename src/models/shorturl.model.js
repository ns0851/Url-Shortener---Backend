import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
    full_url: {
        type: String,
        required: true
    },
    short_url: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    }
});

const shortUrlModel = mongoose.model("URL", shortUrlSchema);

export default shortUrlModel;