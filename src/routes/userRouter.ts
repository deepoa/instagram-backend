import express, { Request, Response } from "express";
import * as userController from "../controllers/userController";
const userRouter = express.Router();

// Define routes for user-related functionality
// userRouter.get("/", (req: Request, res: Response) => {
//   // Get all users
//   res.send("Get all users");
// });

userRouter.post("/register-user", userController.register);
userRouter.post("/login-user", userController.login);
userRouter.post("/create-profile", userController.createProfile);

// userRouter.get("/:id", (req, res) => {
//   // Get user by ID
//   res.send(`Get user with ID ${req.params.id}`);
// });

export default userRouter;
