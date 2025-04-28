import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  BelongsToMany,
  BelongsTo,
  AllowNull,
} from "sequelize-typescript";
import Screening from "./Screening";
import User from "./User";
import Seat from "./Seat";
import Room from "./Room";

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
    type: DataType.ENUM("PENDING", "RESERVED", "DECLINED"),
  })
  declare status: "PENDING" | "RESERVED | DECLINED";

  @Column({
    type: DataType.ARRAY(DataType.UUID),
    allowNull: false,
  })
  declare selected_seats: number[];

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
  })
  declare room_id: string;

  @BelongsTo(() => Room)
  room: Room | undefined;

  @ForeignKey(() => Screening)
  @Column({
    type: DataType.UUID,
  })
  declare screening_id: string;

  @BelongsTo(() => Screening)
  screenings: Screening | undefined;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare user_id: string;

  @BelongsTo(() => User)
  user: User | undefined;
}

export default Reservation;
