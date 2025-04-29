import { Request, Response, NextFunction } from "express";
import { validateRoom } from "../utils/room";
import { createSeat } from "../services/seatService";
import { createRoom } from "../services/roomServicce";

const addRoom = async (
  req: Request<{}, {}, RoomRequest>,
  res: Response,
  next: NextFunction
) => {
  const body = req.body;
  if (!validateRoom(body)) {
    res.status(400).json({ message: "Invalid Room" });
    return;
  }
  const capacity = body.rows.reduce((acc, seats) => acc + seats, 0);
  let room = await createRoom(body.name, capacity);
  body.rows.map(async (numberOfSeats, index) => {
    for (let seatNumber = 1; seatNumber < numberOfSeats + 1; seatNumber++) {
      await createSeat(index, seatNumber, room.id);
    }
  });
  res.status(200).json(room);
};

export { addRoom };
