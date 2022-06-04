import { Router } from "express";
import { LogUpController } from "./logup.controller";
const router = Router();
const logupController = new LogUpController();
router.get("/logup", logupController.findLogUp.bind(logupController));
router.get(
  "/logup/:employeeId/:year/:month/:day",
  logupController.findLogupOne.bind(logupController)
);
router.get(
  "/logup/:employeeId",
  logupController.getLogUpListByEmployee.bind(logupController)
);

router.get(
  "/logup-timesheet/:employeeId",
  logupController.getLogUpListByEmployee.bind(logupController)
);
router.post(
  "/logup/:employeeId/checkin",
  logupController.checkIn.bind(logupController)
);
router.post(
  "/logup/:employeeId/checkout",
  logupController.checkOut.bind(logupController)
);
export const LogupRouters = router;
