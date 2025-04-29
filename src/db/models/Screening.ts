import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from "sequelize-typescript";
import Movie from "./Movie";
import Room from "./Room";
import Reservation from "./Reservation";

@Table({
  tableName: "screenings",
  modelName: "Screening",
})
class Screening extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.DATE,
  })
  declare start_time: Date;

  @Column({
    type: DataType.DATE,
  })
  declare end_time: Date;

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.UUID,
  })
  declare movie_id: string;

  @BelongsTo(() => Movie)
  movie?: Movie;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
  })
  declare room_id: string;

  @BelongsTo(() => Room)
  room?: Room;

  @HasMany(() => Reservation)
  reservations?: Reservation;
}

export default Screening;
