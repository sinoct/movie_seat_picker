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
} from "sequelize-typescript";
import Screening from "./Screening";
import User from "./User";

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

  @Column({
    type: DataType.ENUM("PENDING", "RESERVED", "DECLINED"),
  })
  declare status: "PENDING" | "RESERVED | DECLINED";
}

export default Reservation;
