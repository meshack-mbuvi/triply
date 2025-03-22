import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Trip } from "../entities/trip.entity";
import { UserEntity } from "../entities/user.entity"; // Importing the User entity

dotenv.config(); // Load environment variables from .env file

// Retrieve database credentials from environment variables
const dbName = process.env.DATABASE_NAME;
const dbUserName = process.env.DATABASE_USER;
const dbPassword = process.env.DATABASE_PASSWORD;

export const AppDataSource = new DataSource({
  type: "postgres", // Database type (Change to "mysql" or "sqlite" if needed)
  host: "localhost", // Database host (Change if using a remote DB)
  port: 5432, // Database port (Ensure it matches your DB setup)
  username: dbUserName, // Database username
  password: dbPassword, // Database password
  database: dbName, // Database name

  synchronize: true, // Auto-syncs schema; set to false in production to avoid data loss
  logging: false,
  entities: [UserEntity, Trip], // Specifies entity files to be used by TypeORM
  migrations: ["@/migrations/*.ts"], // Path to migration files (Adjust as needed)
  subscribers: [], // No subscribers defined for now
});
