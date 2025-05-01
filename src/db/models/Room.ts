import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Screening from "./Screening";
import Seat from "./Seat";

@Table({
  tableName: "rooms",
  modelName: "Room",
})
class Room extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare capacity: number;

  @HasMany(() => Screening)
  screenings?: Screening[];

  @HasMany(() => Seat)
  seats?: Seat[];
}

export default Room;
