import { Repository } from "typeorm";
import { Employee } from "../entities";
import { HttpException } from "../exception/http-exception";
import { EmployeeRepository } from "../repositories";
import { CreateEmployeeDto } from "./dto/create-employee.dto";

export class EmployeeService {
  employeeRepository: Repository<Employee>;
  constructor() {
    this.employeeRepository = EmployeeRepository;
  }

  async find() {
    return await this.employeeRepository.find();
  }

  findByid() {
    return {};
  }

  async haveEmployeeById(employeeId: number) {
    const employee = await this.employeeRepository.findOneBy({
      employeeId,
    });

    if (!employee) {
      throw new HttpException(400, `Employee '${employeeId}' not found`);
    }
    return employee;
  }

  async create(dto: CreateEmployeeDto) {
    const insertResult = await this.employeeRepository.insert(dto);

    if (!insertResult?.raw?.insertId) {
      throw new Error();
    }

    const result = await this.employeeRepository.findOneBy({
      employeeId: insertResult?.raw?.insertId,
    });

    return result;
  }

  updateById() {
    return {};
  }
}
