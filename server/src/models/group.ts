import {
  AutoIncrement,
  Column,
  Default,
  Model,
  Table,
} from "sequelize-typescript";
import { sequelize } from "./sequelize-wrapper";

@Table({ timestamps: false })
export class Group extends Model {
  @AutoIncrement
  @Column({ primaryKey: true })
  id!: number;

  @Column
  name!: string;

  @Column
  description?: string;

  @Default(
    "https://www.phenomecentral.org/download/PhenoTips/PhenoTipsGroupTemplate/group.png"
  )
  @Column
  photo?: string;
}

sequelize.addModels([Group]);
