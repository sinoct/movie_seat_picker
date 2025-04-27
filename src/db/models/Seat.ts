import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  ForeignKey,
  HasMany,
  BelongsTo,
  BelongsToMany,
} from "sequelize-typescript";
import Room from "./Room";
import Reservation from "./Reservation";

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
  rooms: Room | undefined;
}

export default Seat;
