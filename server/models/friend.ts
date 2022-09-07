import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import { sequelize } from "./sequelize-wrapper";
import { User } from "./user";

export class Friend extends Model<
  InferAttributes<Friend>,
  InferCreationAttributes<Friend>
> {
  userId: ForeignKey<number>;
  friendId: ForeignKey<number>;
}

Friend.belongsTo(User);

Friend.init({}, { sequelize, tableName: "friend" });
