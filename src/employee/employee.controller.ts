import { Response, Request, NextFunction } from "express";
import { EmployeeService } from "./employee.service";

export default class EmployeeController {
  employeeService: EmployeeService;
  constructor() {
    this.employeeService = new EmployeeService();
  }

  async findEmployee(req: Request, res: Response, next: NextFunction) {
    const result = await this.employeeService.find();
    res.send(result);
  }

  async findEmployeeById(req: Request, res: Response, next: NextFunction) {
    res.send("find employee by Id");
  }

  async createEmployee(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body;
      const result = await this.employeeService.create(dto);
      res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async updateById(req: Request, res: Response, next: NextFunction) {
    res.send("update employee");
  }
}
