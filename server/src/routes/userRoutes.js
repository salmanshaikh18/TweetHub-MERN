import express from "express"
import { Bookmark, Follow, GetOtherUsers, GetProfile, LogOut, SignIn, SignUp, UnFollow } from "../controllers/userController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

export const userRouter = express.Router()

userRouter.post("/signup", SignUp)
userRouter.post("/signin", SignIn)
userRouter.get("/logout", LogOut)
userRouter.put("/bookmark/:tweetId", isAuthenticated, Bookmark)
userRouter.get("/profile/:userId", isAuthenticated, GetProfile)
userRouter.get("/other-users/:userId", isAuthenticated, GetOtherUsers)
userRouter.post("/follow/:userId", isAuthenticated, Follow)
userRouter.post("/unfollow/:userId", isAuthenticated, UnFollow)