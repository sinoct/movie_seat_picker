import Room from "../db/models/Room";

const createRoom = async (name: string, capacity: number) => {
  const room = await Room.create({ name, capacity });
  return room;
};

const fetchRoom = async (room_id: string) => {
  const room = await Room.findByPk(room_id);
  return room;
};

export { createRoom, fetchRoom };
