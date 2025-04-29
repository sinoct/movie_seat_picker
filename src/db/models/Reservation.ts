import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Screening from "./Screening";
import User from "./User";
import Seat from "./Seat";
import Room from "./Room";
import ReservedSeats from "./ReservationSeat";

@Table({
  tableName: "reservations",
  modelName: "Reservation",
})
class Reservation extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.ENUM("LOCKED", "RESERVED", "CANCELLED"),
  })
  declare status: "LOCKED" | "RESERVED" | "CANCELLED";

  @Column({
    type: DataType.STRING,
  })
  declare email: string;

  @ForeignKey(() => Screening)
  @Column({
    type: DataType.UUID,
  })
  declare screening_id: string;

  @BelongsTo(() => Screening)
  screening?: Screening;

  @HasMany(() => ReservedSeats)
  reservedSeats?: ReservedSeats;
}

export default Reservation;
