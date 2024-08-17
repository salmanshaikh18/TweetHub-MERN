import express from "express"
import { SignUp } from "../controllers/userController.js"

export const userRouter = express.Router()

userRouter.post("/signup", SignUp)