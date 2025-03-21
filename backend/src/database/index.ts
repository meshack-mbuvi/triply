import dotenv from "dotenv";

const { Pool } = require("pg");
dotenv.config();

const DB_USER_NAME = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

export const pool = new Pool({
  user: DB_USER_NAME,
  password: DB_PASSWORD,
  host: "localhost",
  port: 5432, // default Postgres port
  database: "triply",
});
