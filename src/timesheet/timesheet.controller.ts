import { NextFunction, Request, Response } from "express";
import { TimeSheetService } from "./timesheet.service";

export class TimeSheetController {
  timesheetService: TimeSheetService;
  constructor() {
    this.timesheetService = new TimeSheetService();
  }

  async getMonthYearList(
    req: Request<{ employeeId: number }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeid = req.params.employeeId;
      const result = await this.timesheetService.findTimeSheetMonthYearList(
        employeeid
      );
      return res.send(result);
    } catch (error) {
      next(error);
    }
  }

  async getTimesheet(
    req: Request<{ employeeId: number; month: number; year: number }>,
    res: Response,
    next: NextFunction
  ) {
    const employeeId = req.params.employeeId;
    const month = req.params.month;
    const year = req.params.year;

    const result = await this.timesheetService.genTimesheet(
      employeeId,
      month,
      year
    );
    return res.send(result);
  }
}
