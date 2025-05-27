import express from "express";
import jwt from 'jsonwebtoken';
import { register, login, logout, reset } from "../controllers/auth.controller.js";

const router = express.Router();

router.get('/', (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(200).send(false); // no token = not logged in
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).send(true); // valid token = logged in
  } catch (err) {
    return res.status(200).send(false); // invalid token = not logged in
  }
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/reset", reset)


export default router;