import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from "sequelize";
import { sequelize } from "./sequelize-wrapper";

export class Group extends Model<InferAttributes<Group>, InferCreationAttributes<Group>> {
  id: number;
  name: string;
  description: string;
  photo: string;
}

Group.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "active",
    },
    photo: {
      type: DataTypes.STRING,
      defaultValue: "/tmp/chat/default-group.png",
    },
  },
  { sequelize, tableName: "group" }
);
