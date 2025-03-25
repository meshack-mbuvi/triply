import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config(); // Load environment variables from .env file

const URL = process.env.DATABASE_URL;

export const AppDataSource = new DataSource({
  type: "postgres", // Database type (Change to "mysql" or "sqlite" if needed)
  url: URL,
  synchronize: false, // Disable auto-sync when using migrations
  logging: true,
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/entities/*.js"]
      : ["src/entities/*.ts"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migrations/*.js"]
      : ["src/migrations/*.ts"],
  subscribers: [],
});
