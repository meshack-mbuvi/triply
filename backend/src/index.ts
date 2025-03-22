import "reflect-metadata";

import { AppDataSource } from "./config/data-source";
import { createApp } from "./lib/app";

const port = process.env.PORT || 8000;

const app = createApp();

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to database");

    app.listen(port, () => {
      console.log(`Server is Fire at https://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed", error);
  });
