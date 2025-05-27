import {
  loginUser,
  registerUser,
  resetPassword,
} from "../services/auth.service.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const token = await registerUser(name, email, password);

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    maxAge: 24 * 60 * 60 * 1000,
  });
  req.user = user;
  res.status(200).json(token);
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser(email, password);

    // Set the token in cookies
    res
      .cookie("accessToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      })
      .status(200)
      .json({ message: "Login successful" });
    req.user = user;
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  res.cookie("accessToken", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
};

export const reset = async (req, res) => {
  const { email, newPassword } = req.body;
  const updatedMessage = await resetPassword(email, newPassword);
  res.status(200).json(updatedMessage);
};
