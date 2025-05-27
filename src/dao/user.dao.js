import userModel from "../models/user.model.js";

export const findUserByMail = async (email) => {
  return await userModel.findOne({ email });
};
export const findUserById = async (id) => {
  return await userModel.findById(id);
};

export const createUser = async (name, email, password) => {
  const newUser = new userModel({
    name,
    email,
    password,
  });
  await newUser.save(); 
  return newUser
};
