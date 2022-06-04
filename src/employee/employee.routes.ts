import { Router } from "express";
import EmployeeController from "./employee.controller";
const router = Router();
const employeeController = new EmployeeController();

router.get(
  "/employee",
  employeeController.findEmployee.bind(employeeController)
);
router.get(
  "/employee/:id",
  employeeController.findEmployeeById.bind(employeeController)
);
router.post(
  "/employee",
  employeeController.createEmployee.bind(employeeController)
);
router.put(
  "/employee/:id",
  employeeController.updateById.bind(employeeController)
);

export const EmployeeRouter = router;
