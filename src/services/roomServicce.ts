import Room from "../db/models/Room";

const createRoom = async (name: string, capacity: number) => {
  const room = await Room.create({ name, capacity });
  return room;
};

export { createRoom };
