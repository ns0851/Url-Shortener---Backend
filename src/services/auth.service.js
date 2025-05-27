import { createUser, findUserByMail } from "../dao/user.dao.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import userModel from "../models/user.model.js";

dotenv.config()

export const registerUser = async (name, email, password) => {
    const user = await findUserByMail(email)
    if (user) {
        throw new Error("User Already Exists!!")
    } 
    const hashed_password = await bcrypt.hash(password, 10);
    const newUser = await createUser(name, email, hashed_password);
    const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "3d"})
    
    return token;
}

export const loginUser = async (email, password) => {
    const user = await findUserByMail(email);
    if (!user) {
        throw new Error("User Does not Exists!!");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"});

    return token;
}

export const resetPassword = async (email, newPassword) => {
    const user = await findUserByMail(email)

    if (!user) {
        return "User does not exist";
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await userModel.findOneAndUpdate(
        {email}, {password: hashedPassword},{ new: true}
    )

    return "Reset Successful!"
}
