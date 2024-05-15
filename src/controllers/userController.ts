import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const register = async (req: Request, res: Response) => {
  const { email, password, mobileNumber, userName } = req.body;
  try {
    // const existingEmail = await User.findAll;

    const existingUserName = await User.findAll({
      where: {
        userName: userName,
        email: email,
      },
    });
    if (existingUserName) {
      return res
        .status(403)
        .json({ message: "UserName already Exist or Email already Exist " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record in the database
    const user = await User.create({
      email,
      password: hashedPassword,
      mobileNumber,
      userName,
    });
    res.status(200).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    // Find the user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Verify the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    // Generate JWT token

    const token = jwt.sign(
      { userId: user.id },
      process.env.SECRET_KEY as string,
      {
        expiresIn: "1h",
      }
    );
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createProfile = () => {
  try {
  } catch (err) {
    console.log(err);
  }
};
