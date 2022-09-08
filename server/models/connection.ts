import { BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import {User} from './user'
import {Group} from './group'
import { sequelize } from "./sequelize-wrapper";
import { NotFoundError } from "../../errors/not-found-error";
import { NotAuthorizedError } from "../../errors/not-authorized-error";

@Table({timestamps: false})
export class Connection extends Model {
    @ForeignKey(() => User)
    @Column({primaryKey: true})
    userId!: number;

    @BelongsTo(() => User, 'userId')
    user?: User;

    @ForeignKey(() => Group)
    @Column({primaryKey: true})
    groupId!: number;

    @BelongsTo(() => Group, 'groupId')
    group?: Group;

    @Default(false)
    @Column
    admin!:boolean

    public static async isAdmin(userId: string, groupId: string) {
        const connection = await Connection.findOne({where: {userId, groupId}});

        if(!connection) {
            throw new NotFoundError();
        }

        if(!connection.admin) {
            throw new NotAuthorizedError();
        }
    }
}

sequelize.addModels([Connection]);
