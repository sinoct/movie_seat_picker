import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Seat from "./Seat";
import Reservation from "./Reservation";

@Table({
  tableName: "reserved_seats",
  modelName: "ReservedSeat",
})
class ReservedSeat extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @ForeignKey(() => Reservation)
  @Column({
    type: DataType.UUID,
  })
  declare reservation_id: string;

  @BelongsTo(() => Reservation)
  reservation?: Reservation;

  @ForeignKey(() => Seat)
  @Column({
    type: DataType.UUID,
  })
  declare seat_id: string;

  @BelongsTo(() => Seat)
  seat?: Seat;
}

export default ReservedSeat;
