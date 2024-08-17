import { User } from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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

    const jwtToken = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
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

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
      user: newUser
    });
  } catch (error) {
    console.log(`Error inside SignUp controller ${error}`);
    res.status(500).json({
      message: "Someting went wrong while signup",
      success: false,
      error: error,
    });
  }
};
