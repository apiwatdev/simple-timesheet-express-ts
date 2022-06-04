import { NextFunction, Request, Response } from "express";
import { LogupService } from "./logup.service";

export class LogUpController {
  logupService: LogupService;
  constructor() {
    this.logupService = new LogupService();
  }

  async findLogUp(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.logupService.findLogup();
      return res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async findLogupOne(
    req: Request<{
      employeeId: number;
      day: number;
      month: number;
      year: number;
    }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = req.params.employeeId;
      const day = req.params.day;
      const month = req.params.month;
      const year = req.params.year;
      const result = this.logupService.findByPrimaryKey(
        employeeId,
        day,
        month,
        year
      );
      return res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async getLogUpListByEmployee(
    req: Request<
      { employeeId: number },
      {},
      {},
      { month: number; year: number }
    >,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = req.params.employeeId;
      const month = req.query.month;
      const year = req.query.year;

      const result = this.logupService.findLogUpByEmployee(
        employeeId,
        month,
        year
      );
      return res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async checkIn(
    req: Request<{ employeeId: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = req.params.employeeId;
      const datetime = req.body.datetime;
      await this.logupService.checkIn(employeeId, datetime);

      return res.status(202).send();
    } catch (error) {
      next(error);
    }
  }

  async checkOut(
    req: Request<{ employeeId: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId = req.params.employeeId;
      const datetime = req.body.datetime;
      await this.logupService.checkOut(employeeId, datetime);
      return res.status(202).send();
    } catch (error) {
      next(error);
    }
  }
}
