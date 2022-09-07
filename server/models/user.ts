import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { sequelize } from "./sequelize-wrapper";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  id: number;
  email: string;
  password: string;
  salt: string;
  name: string;
  status: string;
  photo: string;
}

User.init(
  {
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
    salt: {
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
  },
  { sequelize, tableName: "user" }
);
