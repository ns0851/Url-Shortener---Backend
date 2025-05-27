import jwt from "jsonwebtoken"
import { findUserById } from "../dao/user.dao.js";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.accessToken;
    console.log(token, "ndfisdnfisudnfisudnfisdufn")
    if (!token) return res.status(200).json({message: "Login to Use this feature"});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = findUserById(decoded.id);

        if (!user) return res.status(401).json({message: "Unauthorized"});

        req.user = user;
        next()
    } catch (error) {
        return res.status(401).json({message: "Unauthorized"});
    }
}