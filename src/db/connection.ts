import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import Movie from "./models/Movie";
import Reservation from "./models/Reservation";
import Screening from "./models/Screening";
import User from "./models/User";

dotenv.config();

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "postgres",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
});

sequelize.addModels([Movie, Reservation, Screening, User]);

export default sequelize;
