import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import { sequelize } from "./sequelize-wrapper";
import { User } from "./user";

class FriendAttrs extends Model<
  InferAttributes<FriendAttrs>,
  InferCreationAttributes<FriendAttrs>
> {
  userId: ForeignKey<number>;
  friendId: ForeignKey<number>;
}

FriendAttrs.belongsTo(User);

export const Friend = sequelize.define<FriendAttrs>('Friend', {})
