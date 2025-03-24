import { AppDataSource } from "@/config/data-source"; // Import configured database connection
import { UserEntity } from "@/entities/user.entity"; // Import User entity for database operations
import bcrypt from "bcryptjs"; // Library for hashing passwords
import dotenv from "dotenv"; // Load environment variables from .env file
import { Request, Response } from "express"; // Import Express types for request and response handling
import jwt from "jsonwebtoken";
dotenv.config(); // Load environment variables

export class UserController {
  /**
   * Handles user registration
   * @param req - Express request object
   * @param res - Express response object
   */
  static async signup(req: Request, res: Response) {
    try {
      const { fullName, email, password } = req.body;

      // Validate required fields
      if (!fullName || !email || !password) {
        return res
          .status(400)
          .json({ message: "fullName, email and password are required" });
      }

      // Get user repository from TypeORM data source
      const userRepository = AppDataSource.getRepository(UserEntity);

      // Check if a user with the provided email already exists
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // Hash password before storing it in the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user instance
      const user = userRepository.create({
        fullName,
        email,
        password: hashedPassword,
      });

      // Save the user to the database
      await userRepository.save(user);

      // Generate JWT token
      const secretKey = process.env.SECRET_KEY || "This is secret";
      const token = `Bearer ${jwt.sign(
        { id: user.id, email: user.email, fullName: user.fullName },
        secretKey
      )}`;

      const { password: _, ...userData } = user;

      // Respond with success message
      res.status(201).json({
        message: "User registered successfully",
        user: {
          ...userData,
          token,
        },
      });
    } catch (error) {
      console.error("Error during user signup:", error);
      res.status(500).json({ message: "Server error" });
    }
  }

  /**
   * Handles user authentication
   * @param req - Express request object
   * @param res - Express response object
   */
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ message: "Email and password are required" });
      }

      // Retrieve user from the database
      const userRepository = AppDataSource.getRepository(UserEntity);
      const user = await userRepository.findOne({ where: { email } });

      if (!user) {
        return res
          .status(404)
          .json({ message: "No user found with the given email" });
      }

      // Validate password
      const isPasswordValid = bcrypt.compareSync(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // Generate JWT token
      const secretKey = process.env.SECRET_KEY || "This is secret";
      const token = `Bearer ${jwt.sign(
        { id: user.id, email: user.email, fullName: user.fullName },
        secretKey
      )}`;

      // Remove sensitive user information
      const { password: _, ...userData } = user;

      return res.status(200).json({ ...userData, token });
    } catch (error) {
      console.error("Login error:", error);
      return res
        .status(500)
        .json({ message: "Server error", error: (error as Error).message });
    }
  }

  /**
   * Updates the authenticated user's profile (full name, bio & password).
   *
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns {Promise<Response>} - JSON response with status and user data.
   */
  static async profile(req: Request, res: Response): Promise<Response> {
    try {
      const { fullName, bio, user } = req.body;

      // Ensure at least one field is provided
      if (!fullName && !bio) {
        return res
          .status(400)
          .json({ message: "At least one field must be provided for update" });
      }

      const userRepository = AppDataSource.getRepository(UserEntity);

      // Find user by email
      const existingUser = await userRepository.findOne({
        where: { email: user.email },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Prepare updated data
      const updatedData: Partial<UserEntity> = {};
      if (fullName?.trim()) updatedData.fullName = fullName.trim();
      if (bio?.trim()) updatedData.bio = bio.trim();

      // Update only if there are fields to update
      if (Object.keys(updatedData).length > 0) {
        await userRepository.update({ email: user.email }, updatedData);
      }

      // Fetch updated user details
      const updatedUser = await userRepository.findOne({
        where: { email: user.email },
      });

      // Remove password before responding
      if (updatedUser) {
        const { password, ...userWithoutPassword } = updatedUser;
        return res.status(200).json({
          message: "User updated successfully",
          user: userWithoutPassword,
        });
      }

      return res.status(500).json({ message: "Failed to update user" });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getUserDetails(req: Request, res: Response): Promise<Response> {
    try {
      const { user } = req.body;
      const userRepository = AppDataSource.getRepository(UserEntity);

      // Find user by email
      const existingUser = await userRepository.findOne({
        where: { email: user.email },
      });

      if (!existingUser) {
        return res.status(404).json({ message: "User not found" });
      }

      const { password, ...otherUserProperties } = existingUser;

      return res.json({ user: otherUserProperties });
    } catch (error) {
      console.log("server error: ", { error });
      return res.status(500).json({ message: "Server error" });
    }
  }
}
