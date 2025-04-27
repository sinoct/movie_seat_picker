import dotenv from "dotenv";
import express from "express";
import "./db/connection";
import Movie from "./db/models/Movie";
import Reservation from "./db/models/Reservation";
import Screening from "./db/models/Screening";
import User from "./db/models/User";
import MovieRouter from "./routes/movies/movieRoute";
import sequelize from "./db/connection";

dotenv.config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "test",
  });
});
app.use("/api/movies", MovieRouter);

async function startServer() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synced");

    sequelize.authenticate().then(() => {
      console.log("Connected to the database");
      console.log(`Database name: ${JSON.stringify(sequelize.config)}`);
    });

    app.listen(process.env.PORT_NUMBER, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
}

startServer();
