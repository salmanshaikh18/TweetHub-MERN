import jwt from "jsonwebtoken";
import { handleError } from "../utils/handleError.js";
import dotenv from "dotenv";
dotenv.config();

export const isAuthorized = async (req, res, next) => {
  try {
    const {userId} = req.body; // Extracting id from request body
    const token = req.cookies.token;
    console.log("UserId: ", userId)
    
    // Log the token for debugging
    // console.log("Token:", token);
    
    // Check if the token exists
    if (!token) {
      return res.status(401).json({
        message: "You are not authenticated! token not found",
        success: false,
      });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    
    // Log the decoded payload for debugging
    // console.log("Decoded:", decoded);
    
    // Check if the decoded user ID matches the ID in the request body
    if (decoded.userId !== userId) {
      return res.status(403).json({
        message: "You are not authorized!",
        success: false,
      });
    }
    
    // Attach user ID to the request object
    req.user = decoded._id;
    
    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    handleError(error, "isAuthorized", res);
  }
};
