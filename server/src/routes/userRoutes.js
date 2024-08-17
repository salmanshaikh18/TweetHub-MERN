import express from "express"
import { LogOut, SignIn, SignUp } from "../controllers/userController.js"

export const userRouter = express.Router()

userRouter.post("/signup", SignUp)
userRouter.post("/signin", SignIn)
userRouter.get("/logout", LogOut)