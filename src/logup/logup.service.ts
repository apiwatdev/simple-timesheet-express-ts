import { Repository } from "typeorm";
import { AppDataSource } from "../db";
import { EmployeeService } from "../employee/employee.service";
import { Employee, LogUp } from "../entities";
import { HttpException } from "../exception/http-exception";
import { EmployeeRepository, LogUpRepository } from "../repositories";
import { MonthYearObjectType } from "../timesheet/timesheet.service";

export class LogupService {
  logupRepository: Repository<LogUp> = LogUpRepository;
  employeeRepository: Repository<Employee> = EmployeeRepository;
  employeeService: EmployeeService;
  constructor() {
    this.employeeService = new EmployeeService();
  }

  async findLogup() {
    const result = await this.logupRepository.find();
    return result;
  }

  async findByPrimaryKey(
    employeeId: number,
    day: number,
    month: number,
    year: number
  ) {
    const result = await this.logupRepository.findOneBy({
      day,
      month,
      year,
      employee: {
        employeeId,
      },
    });

    return result;
  }

  async findLogUpByEmployee(employeeId: number, month: number, year: number) {
    return [];
  }

  async foundTodayLogup(employeeId: number, now: Date) {
    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const foundTodayLogup = await this.logupRepository.findOne({
      where: {
        day: day,
        month: month,
        year: year,
        employee: {
          employeeId: employeeId,
        },
      },
      relations: {
        employee: true,
      },
    });

    return foundTodayLogup;
  }

  async checkIn(employeeId: number, datetime: string): Promise<void> {
    const now = new Date(datetime);
    const employee = await this.employeeService.haveEmployeeById(employeeId);

    const foundTodayLogup = await this.foundTodayLogup(employeeId, now);

    if (foundTodayLogup) {
      throw new HttpException(400, `Already check-in today`);
    }

    const newLogUp = new LogUp();
    newLogUp.day = now.getDate();
    newLogUp.month = now.getMonth() + 1;
    newLogUp.year = now.getFullYear();
    newLogUp.checkIn = now;
    newLogUp.employee = employee;

    await this.logupRepository.save(newLogUp);
  }

  calHours(checkIn: Date, checkOut: Date) {
    var diffMs = checkOut.getTime() - checkIn.getTime();
    var diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    return diffHrs;
  }

  async checkOut(employeeId: number, datetime: string): Promise<void> {
    const now = new Date(datetime);
    const employee = await this.employeeService.haveEmployeeById(employeeId);

    const foundTodayLogup = await this.foundTodayLogup(employeeId, now);

    if (!foundTodayLogup || foundTodayLogup.checkOut) {
      throw new HttpException(400, `Haven't checked in today`);
    }

    const hours = this.calHours(foundTodayLogup.checkIn, now);
    foundTodayLogup.checkOut = now;
    foundTodayLogup.hours = hours;
    if (hours > 8) {
      foundTodayLogup.OTHours = hours - 8;
      foundTodayLogup.hours = 8;
    }

    await this.logupRepository.update(
      {
        day: foundTodayLogup.day,
        month: foundTodayLogup.month,
        year: foundTodayLogup.year,
        employee: employee,
      },
      foundTodayLogup
    );
  }

  async getDistinctMonthYear(
    employeeId: number
  ): Promise<MonthYearObjectType[]> {
    const result = await this.logupRepository
      .createQueryBuilder()
      .select("DISTINCT LogUp.year , LogUp.month ")
      .where("employeeEmployeeId = :employeeId", { employeeId })
      .execute();

    return result;
  }
}
