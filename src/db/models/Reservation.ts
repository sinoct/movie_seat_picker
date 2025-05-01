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
import ReservedSeat from "./ReservationSeat";
import { ReservationType } from "../../types/reservation";

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
  declare status: ReservationType;

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

  @HasMany(() => ReservedSeat)
  reservedSeats?: ReservedSeat;
}

export default Reservation;
