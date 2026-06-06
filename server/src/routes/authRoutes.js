import express from "express";
import { hashPassword, comparePassword } from "../utils/hashing.js";
import generateToken from "../utils/generateToken.js";
import mongoose from "mongoose";
import User from "../models/User.js";

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // check whether all fields are provided
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      message: "First name, last name, email, and password are required",
    });
  }
  // validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email",
    });
  }
  // validate password strength
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character",
    });
  }
  // check for duplicate email
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({
      message: "Email already exists",
    });
  }

  // save the user to a database
  const newUser = await new User({
    id: new mongoose.Types.ObjectId(),
    username: firstName + " " + lastName,
    email,
    password: await hashPassword(password),
  });
  await newUser.save();

  const token = generateToken(newUser._id);
  if (!token) {
    return res.status(500).json({ message: "Failed to generate token" });
  }

  res.status(201).json({
    message: "Data received",
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    },
  });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await comparePassword(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = generateToken(user._id);

  if (!token) {
    return res.status(500).json({ message: "Failed to generate token" });
  }

  return res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
});

export default authRouter;
