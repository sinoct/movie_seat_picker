import { Table, Column, Model, DataType, HasMany } from "sequelize-typescript";
import Screening from "./Screening";

@Table({
  tableName: "movies",
  modelName: "Movie",
})
class Movie extends Model {
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
  declare title: string;

  @HasMany(() => Screening)
  screenings?: Screening;
}

export default Movie;
