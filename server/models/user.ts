import { AutoIncrement, Column, Model, Table } from "sequelize-typescript";
import { sequelize } from "./sequelize-wrapper";

@Table
export class User extends Model {
  @AutoIncrement
  @Column({ primaryKey: true })
  id!: number;

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
