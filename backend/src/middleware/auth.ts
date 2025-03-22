import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

/**
 * Middleware to authenticate users using JWT.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {NextFunction} next - Express next function.
 */
export const auth = (req: Request, res: Response, next: NextFunction): void => {
  const secretKey =
    process.env.SECRET_KEY || "This should be secret and secure";

  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res
      .status(401)
      .json({ message: "Access denied. Provide a valid auth token" });
    return; // Explicitly return to end execution
  }

  const token = authHeader.split(" ")[1];

  // Verify the token asynchronously
  jwt.verify(token, secretKey, (error, user) => {
    if (error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expired. Please log in again" });
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
      return; // Explicitly return to avoid calling next()
    }

    req.body.user = user; // Attach user info to request
    next(); // Move to next middleware or route handler
  });
};
