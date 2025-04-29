import dotenv from "dotenv";
import express from "express";
import "./db/connection";
import MovieRouter from "./routes/movieRoute";
import sequelize from "./db/connection";
import UserRouter from "./routes/userRoute";
import ScreeningRouter from "./routes/screeningRoute";
import RoomsRouter from "./routes/roomRoute";
import ReservationRouter from "./routes/reservationRoute";
import { errorHandler } from "./middlewares/error";
import { startExpirationChecker } from "./services/lockExpiryService";

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api/movies", MovieRouter);
app.use("/api/users", UserRouter);
app.use("/api/screenings", ScreeningRouter);
app.use("/api/rooms", RoomsRouter);
app.use("/api/reservations", ReservationRouter);

app.use(errorHandler);

async function startServer() {
  try {
    await sequelize.sync({ alter: true });
    console.log("Database synced");

    sequelize.authenticate().then(() => {
      console.log("Connected to the database");
    });

    startExpirationChecker();
    app.listen(process.env.PORT_NUMBER, () => {
      console.log("Server running on http://localhost:3000");
    });
  } catch (error) {
    console.error("Unable to sync database:", error);
  }
}

startServer();
