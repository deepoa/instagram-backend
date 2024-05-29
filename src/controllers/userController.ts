import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { z } from "zod";

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  mobileNumber: z
    .string()
    .regex(/^\d{10}$/)
    .optional()
    .nullable(),
  userName: z.string().nonempty(),
});

export const register = async (req: Request, res: Response) => {
  const { email, password, mobileNumber, userName } = req.body;
  const validationResult = UserSchema.safeParse({
    email,
    password,
    mobileNumber,
    userName,
  });

  if (!validationResult.success) {
    // Return validation errors to the client
    return res.status(400).json({ errors: validationResult.error.format() });
  }
  try {
    const existingUserName = await User.findOne({
      where: {
        userName: userName,
      },
    });
    if (existingUserName) {
      return res.status(403).json({ message: "UserName already Exist" });
    }

    const existingEmail = await User.findOne({
      where: {
        email: email,
      },
    });
    if (existingEmail) {
      return res.status(403).json({ message: " Email already Exist " });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // Create a new user record in the database

    if (!existingUserName && !existingEmail) {
      const user = await User.create({
        email: email,
        password: hashedPassword,
        mobileNumber: mobileNumber,
        userName: userName,
      });
      res.status(200).json({ message: "User registered successfully", user });
    } else {
      res.status(400).json({ message: "Fill all the details" });
    }
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
