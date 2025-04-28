import dotenv from "dotenv";
import express from "express";
import "./db/connection";
import MovieRouter from "./routes/movies/movieRoute";
import sequelize from "./db/connection";
import UserRouter from "./routes/users/userRoute";
import ScreeningRouter from "./routes/screenings/screeningRoute";
import RoomsRouter from "./routes/rooms/roomRoute";
import { errorHandler } from "./middlewares/error";

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
app.use("/api/users", UserRouter);
app.use("/api/screenings", ScreeningRouter);
app.use("/api/rooms", RoomsRouter);

app.use(errorHandler);

async function startServer() {
  try {
    sequelize.authenticate().then(() => {
      console.log("Connected to the database");
    });

    await sequelize.sync({ alter: true });
    console.log("Database synced");

    app.listen(process.env.PORT_NUMBER, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
}

startServer();
