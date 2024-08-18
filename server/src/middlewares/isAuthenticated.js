import jwt from "jsonwebtoken";
import { handleError } from "../utils/handleError.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/userSchema.js";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Extracting the token from cookies

    // Check if the token exists
    if (!token) {
      return res.status(401).json({
        message: "You are not authenticated!",
        success: false,
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);


    console.log("Decoded data ", decoded)

    // Log the decoded payload for debugging
    // console.log("Decoded:", decoded);

    // Attach user ID to the request object
    req.user = decoded._id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    handleError(error, "isAuthenticated", res);
  }
};
