import jwt from "jsonwebtoken";
import { handleError } from "../utils/handleError.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { User } from "../models/userSchema.js";
dotenv.config();

export const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies.token; // Extracting the token from cookies

    const userIdParams = req.params.userId;
    const userIdBody = req.body.userId;

    // Check if the token exists
    if (!token) {
      return res.status(401).json({
        message: "You are not authenticated!",
        success: false,
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    console.log("Decoded data: ", decoded);

    // Validate and check if the userIdParams exists and is valid
    if (userIdParams) {
      if (!mongoose.Types.ObjectId.isValid(userIdParams)) {
        return res.status(400).json({
          message: "Invalid userId format in params",
          success: false,
        });
      }
      
      const isUserExistWithUserIdParams = await User.findById(userIdParams);
      if (!isUserExistWithUserIdParams) {
        return res.status(404).json({
          message: "User not found with userId in params",
          success: false,
        });
      }
    }

    // Validate and check if the userIdBody exists and is valid
    if (userIdBody) {
      if (!mongoose.Types.ObjectId.isValid(userIdBody)) {
        return res.status(400).json({
          message: "Invalid userId format in body",
          success: false,
        });
      }

      const isUserExistWithUserIdBody = await User.findById(userIdBody);
      if (!isUserExistWithUserIdBody) {
        return res.status(404).json({
          message: "User not found with userId in body",
          success: false,
        });
      }
    }

    // Attach user ID to the request object from the decoded token
    req.user = decoded._id;

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    handleError(error, "isAuthenticated", res);
  }
};
