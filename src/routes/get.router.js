import express from "express";
import userModel from "../models/user.model.js";
import shortUrlModel from "../models/shorturl.model.js";

const router = express.Router();

router.get("/users", async (req, res) => {
    const all = await userModel.find()
    res.send(all)
})

router.get("/urls", async (req, res) => {
    const all = await shortUrlModel.find()
    res.send(all)
})

export default router