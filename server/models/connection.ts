import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
  ForeignKey,
} from "sequelize";
import { sequelize } from "./sequelize-wrapper";
import {User} from './user'
import {Group} from './group'

export class Connection extends Model<InferAttributes<Connection>, InferCreationAttributes<Connection>> {
    userId: ForeignKey<number>;
    groupId: ForeignKey<number>;
    isAdmin: boolean;
}

User.belongsToMany(Group, {
    through: Connection,
    sourceKey: 'id',
    targetKey: 'userId'
})

Group.belongsToMany(User, {
    through: Connection,
    sourceKey: 'id',
    targetKey: 'groupId'
})

Connection.init(
  {
      isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: 0,
      },
  },
  { sequelize, tableName: "connection" }
);
