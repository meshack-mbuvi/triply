import { AppDataSource } from "@/data-source"; // Import configured database connection
import { User } from "@/entities/user"; // Import User entity for database operations
import bcrypt from "bcryptjs"; // Library for hashing passwords
import dotenv from "dotenv"; // Load environment variables from .env file
import { Request, Response } from "express"; // Import Express types for request and response handling

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
      const userRepository = AppDataSource.getRepository(User);

      // Check if a user with the provided email already exists
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
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

      // Respond with success message
      res.status(201).json({ message: "User registered successfully", user });
    } catch (error) {
      console.error("Error during user signup:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
}
