import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../utils/handleError.js";
import mongoose from "mongoose";

export const SignUp = async (req, res) => {
  try {
    const { name, userName, email, password } = req.body;

    if (!name || !userName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist.",
        success: false,
      });
    }

    const saltValue = await bcryptjs.genSalt();

    const hashedPassword = await bcryptjs.hash(password, saltValue);

    const newUser = await User.create({
      name,
      userName,
      password: hashedPassword,
      email,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: newUser,
    });
  } catch (error) {
    handleError(error, "SignUp", res);
  }
};

export const SignIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email && !password) {
      return res.status(400).json({
        message: "Email and password are required!",
        success: false,
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Please provide your email!",
        success: false,
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Please provide your password",
        success: false,
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist with this email!",
        success: false,
      });
    }

    const isPasswordMatched = await bcryptjs.compare(password, user.password);

    if (!password) {
      return res.status(400).json({
        message: "Please provide your password!",
      });
    }

    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect email or password!",
        success: "false",
      });
    }

    const jwtToken = await jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("token", jwtToken, {
      path: "/",
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      httpOnly: true,
      sameSite: "lax",
    });

    return res.status(200).json({
      message: `Welcome back ${user.userName} :)`,
      success: true,
    });
  } catch (error) {
    handleError(error, "SignIn", res);
  }
};

export const LogOut = async (req, res) => {
  try {
    res.clearCookie("token");

    return res.status(200).json({
      message: "User logged out successfully",
      success: true,
    });
  } catch (error) {
    handleError(error, "LogOut", res);
  }
};

export const Bookmark = async (req, res) => {
  try {
    const loggedInUserId = req.body.userId;
    const tweetId = req.params.tweetId;

    const user = await User.findById(loggedInUserId);

    if (user.bookmarks.includes(tweetId)) {
      await User.findByIdAndUpdate(loggedInUserId, {
        $pull: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Removed to bookmarks",
        success: true,
      });
    } else {
      await User.findByIdAndUpdate(loggedInUserId, {
        $push: { bookmarks: tweetId },
      });
      return res.status(200).json({
        message: "Saved to bookmarks",
        success: true,
      });
    }
  } catch (error) {
    handleError(error, "Bookmark", res);
  }
};

export const GetProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "User not exists",
        success: false,
      });
    }
    console.log("User: ", user);
    return res.status(200).json({
      message: "Profile fetched :)",
      success: true,
      user: user,
    });
  } catch (error) {
    handleError(error, "GetProfile", res);
  }
};

export const GetOtherUsers = async (req, res) => {
  try {
    const loggedInUserId = req.params.userId;

    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(loggedInUserId)) {
      return res.status(400).json({
        message: "Invalid userId format",
        success: false,
      });
    }

    // Attempt to find the user in the database after validation
    const loggedInUser = await User.findOne({ _id: loggedInUserId });

    if (!loggedInUser) {
      return res.status(400).json({
        message: "User Not Found",
        success: false,
      });
    }

    // Fetch other users except the logged-in user
    const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    if (!otherUsers || otherUsers.length === 0) {
      return res.status(400).json({
        message: "Currently, there are no other users!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Other users fetched successfully",
      success: true,
      otherUsers: otherUsers,
    });
  } catch (error) {
    handleError(error, "GetOtherUsers", res);
  }
};


export const Follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.userId

    const otherUserId = req.params.userId

    const loggedInUser = await User.findById(loggedInUserId)
    const otherUser = await User.findById(otherUserId)

    if (!otherUser.followers.includes(loggedInUserId)) {
      await otherUser.updateOne({$push: {followers: loggedInUserId}})
      await loggedInUser.updateOne({$push: {following: otherUserId}})
    } else {
      return res.status(400).json({
        message: `You already followed ${otherUser.userName}`,
        success: false
      })
    }

    return res.status(200).json({
      message: `${loggedInUser.userName} just followed to ${otherUser.userName}`,
      success: true
    })

  } catch (error) {
    handleError(error, "Follow", res)
  }
}

export const UnFollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.userId
    const otherUserId = req.params.userId

    const loggedInUser = await User.findById(loggedInUserId)
    const otherUser = await User.findById(otherUserId)

    if (loggedInUser.following.includes(otherUserId)) {
      await otherUser.updateOne({$pull: {followers: loggedInUserId}})
      await loggedInUser.updateOne({$pull: {following: otherUserId}})
    } else {
      return res.status(400).json({
        message: "User has not followed yet"
      })
    }
    return res.status(200).json({
      message: `${loggedInUser.userName} unfollowed to ${otherUser.userName}`
    })
  } catch (error) {
    handleError(error, "UnFollow", res)
  }
}