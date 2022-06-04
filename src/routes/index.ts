import { Router } from "express";
import { EmployeeRouter } from "../employee/employee.routes";
import { LogupRouters } from "../logup/logup.routes";
import { TimeSheetRouter } from "../timesheet/timesheet.routes";

export const createRouters = () => {
  const routers = Router();
  routers.use(EmployeeRouter);
  routers.use(LogupRouters);
  routers.use(TimeSheetRouter);

  return routers;
};
