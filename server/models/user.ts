import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "./sequelize-wrapper";

interface User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  id: CreationOptional<number>;
  email: string;
  password: string;
  name: string;
  status: CreationOptional<string>;
  photo: CreationOptional<string>;
}

export const User = sequelize.define<User>('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: "/tmp/chat/default-user.png",
    },
})
