import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  HasMany,
  BeforeCreate,
} from "sequelize-typescript";
import bcrypt from "bcrypt";
import Reservation from "./Reservation";

@Table({
  tableName: "users",
  modelName: "User",
})
class User extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  })
  declare password: string;

  @Column({
    type: DataType.STRING,
    unique: true,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
  })
  declare apiKey: string;

  @HasMany(() => Reservation)
  reservations: Reservation[] | undefined;

  @BeforeCreate
  static async hashPassword(user: User) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10); // 10 is the salt rounds
    }
  }
}

export default User;
