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

  @ForeignKey(() => Movie)
  @Column({
    type: DataType.UUID,
  })
  declare movie_id: string;

  @BelongsTo(() => Movie)
  movies: Movie | undefined;

  @Column({
    type: DataType.DATE,
  })
  declare start_time: Date;

  @Column({
    type: DataType.DATE,
  })
  declare end_time: Date;

  @HasMany(() => Reservation)
  reservations: Reservation[] | undefined;
}

export default Screening;
