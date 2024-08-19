import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "description is required!"],
    },
    like: {
      type: Array,
      deafult: [],
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    userDetails: {
      type: Array,
      default: []
    }
  },
  { timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
