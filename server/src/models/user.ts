import {
  AutoIncrement,
  Column,
  Default,
  Index,
  Model,
  Table,
} from "sequelize-typescript";
import { sequelize } from "./sequelize-wrapper";

@Table({ timestamps: false })
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

  @Default("Active")
  @Column
  status?: string;

  @Default(
    "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
  )
  @Column
  photo?: string;
}

sequelize.addModels([User]);
