import express from "express"

import { isAuthenticated } from "../middlewares/isAuthenticated.js"
import { CreateTweet, DeleteTweet, GetAllUsersTweets, GetFollowingUsersTweets, LikeOrDislike } from "../controllers/tweetController.js"
import { isAuthorized } from "../middlewares/isAuthorrized.js"

export const tweetRouter = express.Router()

tweetRouter.post("/create", isAuthorized, CreateTweet)
tweetRouter.delete("/delete/:tweetId", isAuthorized, DeleteTweet)
tweetRouter.put("/like/:tweetId", isAuthorized, LikeOrDislike )
tweetRouter.get("/all-tweets/:userId", isAuthenticated, GetAllUsersTweets)
tweetRouter.get("/following-users/tweets/:userId", isAuthenticated, GetFollowingUsersTweets)