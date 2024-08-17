import express from "express"

import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { CreateTweet, DeleteTweet, LikeOrDislike } from "../controllers/tweetController.js"

export const tweetRouter = express.Router()

tweetRouter.post("/create", isAuthenticated, CreateTweet)
tweetRouter.delete("/delete/:tweetId", isAuthenticated, DeleteTweet)
tweetRouter.put("/like/:tweetId", isAuthenticated, LikeOrDislike )
