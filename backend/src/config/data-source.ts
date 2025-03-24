import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Trip } from "../entities/trip.entity";
import { UserEntity } from "../entities/user.entity"; // Importing the User entity

dotenv.config(); // Load environment variables from .env file

const URL = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres", // Database type (Change to "mysql" or "sqlite" if needed)
  url: URL,

  synchronize: true, // Auto-syncs schema; set to false in production to avoid data loss
  logging: false,
  entities: [UserEntity, Trip], // Specifies entity files to be used by TypeORM
  migrations: ["@/migrations/*.ts"], // Path to migration files (Adjust as needed)
  subscribers: [], // No subscribers defined for now
});
