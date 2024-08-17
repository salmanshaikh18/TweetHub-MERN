import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { handleError } from "../utils/handleError.js";

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
        _id: user._id,
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

    const user = await User.findById(loggedInUserId)
   
    if (user.bookmarks.includes(tweetId)) {
        await User.findByIdAndUpdate(loggedInUserId, {$pull: {bookmarks: tweetId}})
        return res.status(200).json({
            message: "User unbookmarked your tweet",
            success: true
        })
    } else {
        await User.findByIdAndUpdate(loggedInUserId, {$push: {bookmarks: tweetId}})
        return res.status(200).json({
            message: "User bookmarked your tweet",
            success: true
        })
    }
  } catch (error) {
    handleError(error, "Bookmark", res);
  }
};