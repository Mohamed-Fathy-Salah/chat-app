import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { sequelize } from "./sequelize-wrapper";
import { User } from "./user";

@Table({timestamps: false})
export class Friend extends Model {
    @ForeignKey(() => User)
    @Column({primaryKey: true})
    userId!: number;

    @ForeignKey(() => User)
    @Column({primaryKey: true})
    friendId!: number;

    @BelongsTo(() => User, 'friendId')
    friend?: User;
}

sequelize.addModels([Friend]);
