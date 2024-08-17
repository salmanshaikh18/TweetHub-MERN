import { Tweet } from "../models/tweetSchema.js";
import { handleError } from "../utils/handleError.js";

export const CreateTweet = async (req, res) => {
  try {
    const { description, id } = req.body;

    if (!description || !id) {
      return res.status(400).json({
        message: "All the fields are required!",
        success: false,
      });
    }

    await Tweet.create({
      description,
      userId: id,
    });

    return res.status(201).json({
      message: "Tweet created successfully :)",
      message: true,
    });
  } catch (error) {
    handleError(error, "CreateTweet", res);
  }
};

export const DeleteTweet = async (req, res) => {
  try {
    const { tweetId } = req.params;
    const deletedTweet = await Tweet.findByIdAndDelete(tweetId);

    if (!deletedTweet) {
      return res.status(404).json({
        message: "Tweet not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Tweet deleted successfully",
      success: true,
      deletedTweet: deletedTweet,
    });
  } catch (error) {
    handleError(error, "DeleteTweet", res);
  }
};

export const LikeOrDislike = async (req, res) => {
  try {
    const loggedInUserId = req.body.userId;
    const tweetId = req.params.tweetId;

    const tweet = await Tweet.findById(tweetId);

    if (tweet.like.includes(loggedInUserId)) {
      await Tweet.findByIdAndUpdate(tweetId, {
        $pull: { like: loggedInUserId },
      });
      return res.status(200).json({
        message: "User disliked your tweet",
        success: true,
      });
    } else {
      await Tweet.findByIdAndUpdate(tweetId, {
        $push: { like: loggedInUserId },
      });
      console.log(tweetId);
      return res.status(200).json({
        message: "User liked your tweet",
        success: true,
      });
    }
  } catch (error) {
    handleError(error, "LikeOrDislike", res);
  }
};


