import { Tweet } from "../models/tweetSchema.js"
import { handleError } from "../utils/handleError.js"

export const createTweet = async (req, res) => {
    try {
        const {description, id} = req.body

        if (!description || !id) {
            return res.status(400).json({
                message: "All the fields are required!",
                success: false
            })
        }

        await Tweet.create({
            description,
            userId: id
        })

        return res.status(201).json({
            message: "Tweet created successfully :)",
            message: true
        })
    } catch (error) {
        handleError(error, "createTweet", res)
    }
}

export const deleteTweet = async (req, res) => {
    try {
        const {tweetId} = req.params
        const deletedTweet = await Tweet.findByIdAndDelete(tweetId)

        if (!deletedTweet) {
            return res.status(404).json({
                message: "Tweet not found",
                success: false
            });
        }


        return res.status(200).json({
            message: "Tweet deleted successfully",
            success: true,
            deletedTweet: deletedTweet
        })
    } catch (error) {
        handleError(error, "deleteTweet", res)
    }
}