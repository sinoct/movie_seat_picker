import { Table, Column, Model, DataType } from "sequelize-typescript";

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
  })
  declare name: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare capacity: number;
}

export default Room;
