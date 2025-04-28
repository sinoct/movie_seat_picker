const validateRoom = (room: RoomRequest) => {
  return room.rows.every((seats) => seats > 0);
};

export { validateRoom };
