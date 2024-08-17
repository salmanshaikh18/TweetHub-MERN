import express from "express"
import { createTweet, deleteTweet } from "../controllers/tweetController.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

export const tweetRouter = express.Router()

tweetRouter.post("/create", isAuthenticated, createTweet)
tweetRouter.delete("/delete/:tweetId", isAuthenticated, deleteTweet)