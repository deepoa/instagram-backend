import express, { Request, Response } from "express";
import userRouter from "./userRouter";
const router = express.Router();

router.use("/users", userRouter);
router.use("/create-profile", userRouter);

export default router;
