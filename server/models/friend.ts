import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { sequelize } from "./sequelize-wrapper";
import { User } from "./user";

@Table
export class Friend extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => User)
    @Column
    friendId!: number;

    @BelongsTo(() => User)
    friend?: User;
}

sequelize.addModels([Friend]);
