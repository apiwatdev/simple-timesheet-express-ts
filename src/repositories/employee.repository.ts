import { AppDataSource } from "../db";
import { Employee } from "../entities";

export const EmployeeRepository = AppDataSource.getRepository(Employee).extend(
  {}
);
