import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
  BelongsTo,
} from "sequelize-typescript";
import Room from "./Room";
import ReservedSeat from "./ReservationSeat";

@Table({
  tableName: "seats",
  modelName: "Seats",
})
class Seat extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare row_number: number;

  @Column({
    type: DataType.INTEGER,
  })
  declare seat_number: number;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
  })
  declare room_id: string;

  @BelongsTo(() => Room)
  room?: Room;

  @HasMany(() => ReservedSeat)
  reservedSeat?: ReservedSeat[];
}

export default Seat;
