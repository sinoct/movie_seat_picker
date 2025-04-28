import { Request, Response, NextFunction } from "express";
import Seat from "../../db/models/Seat";
import Room from "../../db/models/Room";
import { validateRoom } from "../../utils/room";

const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body as RoomRequest;
  if (!validateRoom(body)) {
    res.status(400).json({ message: "Invalid Room" });
    return;
  }
  const capacity = body.rows.reduce((acc, seats) => acc + seats, 0);
  let room = await Room.create({ name: body.name, capacity });
  body.rows.map((numberOfSeats, index) => {
    for (let seatNumber = 1; seatNumber < numberOfSeats + 1; seatNumber++) {
      Seat.create({
        row_number: index,
        seat_number: seatNumber,
        room_id: room.id,
      });
    }
  });
  res.status(200).json(room);
};

export { createRoom };
