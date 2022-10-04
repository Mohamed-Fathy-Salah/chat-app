import { Sequelize } from "sequelize-typescript";

export const sequelize = new Sequelize(process.env.POSTGRES_URL!);
