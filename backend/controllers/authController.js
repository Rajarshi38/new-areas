import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description controller for login user
 */
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({
      message: "Logged in successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(401).json({
      message: "Invalid email and password",
    });
  }
});
/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description controller function for logout user
 */
const logout = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @description controller function for register a user with name,email and password
 */
const signup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      message: "Registered user successfully!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res *
 * @description get profile data of user
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = {
    message: "Fetched user profile successfully",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    },
  };

  res.status(200).json({
    user,
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const currentUser = await User.findById(req.user._id);
  if (currentUser) {
    currentUser.name = req.body.name || currentUser.name;
    currentUser.email = req.body.email || currentUser.email;
  }
  const updatedUser = await currentUser.save();
  res.status(200).json({
    message: "Updated user successfully",
    user: updatedUser,
  });
});

export { loginUser, signup, logout, getProfile, updateProfile };
