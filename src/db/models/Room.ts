import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Reservation from "./Reservation";
import Screening from "./Screening";

@Table({
  tableName: "rooms",
  modelName: "Movie",
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
  screenings: Screening[] | undefined;

  @HasMany(() => Reservation)
  reservations: Reservation[] | undefined;
}

export default Room;
