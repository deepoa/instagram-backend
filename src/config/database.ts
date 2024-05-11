import { Sequelize } from "sequelize-typescript";
require("dotenv").config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

export const sequelize = new Sequelize({
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  port: Number(DB_PORT),
  dialect: "postgres",
  logging: false, // Disable logging SQL queries (optional)
});
