import mongoose from "mongoose";

const twitterSchema = new mongoose.Schema(
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
    bookmarks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);
