import { AutoIncrement, Column, Index, Model, Table } from "sequelize-typescript";
import { sequelize } from "./sequelize-wrapper";

@Table({timestamps: false})
export class User extends Model {
  @AutoIncrement
  @Column({ primaryKey: true })
  id!: number;

  @Index
  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  name!: string;

  @Column
  status?: string;

  @Column
  photo?: string;
}

sequelize.addModels([User]);
