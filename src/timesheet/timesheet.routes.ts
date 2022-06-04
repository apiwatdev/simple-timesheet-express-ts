import { Router } from "express";
import { TimeSheetController } from "./timesheet.controller";

const router = Router();
const timesheetController = new TimeSheetController();
router.get(
  "/api/timesheet/:employeeId/month-year",
  timesheetController.getMonthYearList.bind(timesheetController)
);
router.get(
  "/api/timesheet/:employeeId/:month-:year",
  timesheetController.getTimesheet.bind(timesheetController)
);

export const TimeSheetRouter = router;
