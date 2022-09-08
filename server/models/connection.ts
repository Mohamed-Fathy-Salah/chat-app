import { BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import {User} from './user'
import {Group} from './group'
import { sequelize } from "./sequelize-wrapper";

@Table({timestamps: false})
export class Connection extends Model {
    @ForeignKey(() => User)
    @Column({primaryKey: true})
    userId!: number;

    @ForeignKey(() => Group)
    @Column({primaryKey: true})
    groupId!: number;

    @BelongsTo(() => Group, 'groupId')
    group?: Group;

    @Default(false)
    @Column
    admin!:boolean

    public static async isAdmin(userId: string, groupId: string): Promise<boolean> {
        const connection = await Connection.findOne({where: {userId, groupId}});
        if(!connection) return false;
        return connection.admin;
    }
}

sequelize.addModels([Connection]);
