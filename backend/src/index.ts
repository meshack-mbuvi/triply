import "reflect-metadata";
import { AppDataSource } from "./config/data-source";
import { createApp } from "./lib/app";

const port = process.env.PORT || 8000;

async function startServer() {
  try {
    await AppDataSource.initialize();
    console.log("Connected to database");

    const app = createApp();
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Database connection or migration failed:", error);
  }
}

startServer();
