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
import Movie from "./Movie";
import Reservation from "./Reservation";
import Room from "./Room";

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
  movies: Movie | undefined;

  @ForeignKey(() => Room)
  @Column({
    type: DataType.UUID,
  })
  declare room_id: string;

  @BelongsTo(() => Room)
  room: Room | undefined;

  @HasMany(() => Reservation)
  reservations: Reservation[] | undefined;
}

export default Screening;
