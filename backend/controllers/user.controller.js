import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// ============================
// REGISTER USER
// ============================
export const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });

    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User already exists",
      });

    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
};

// ============================
// LOGIN USER
// ============================
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "User does not exist",
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
};

// ============================
// LOGOUT USER
// ============================
export const logoutUser = async (req, res) => {
  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite:
        process.env.NODE_ENV === "production"
          ? "none"
          : "lax",
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
};

// ============================
// CHECK AUTH USER
// ============================
export const isAuthUser = async (req, res) => {
  try {

    const userId = req.user;

    if (!userId) {

      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });

    }

    const user = await User.findById(userId).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      user,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });

  }
};