import "reflect-metadata";
import { DataSource } from "typeorm";
import { Employee, Timesheet } from "../entities";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "user",
  password: "password",
  database: "mydb",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: [],
  subscribers: [],
});
