import { EmployeeService } from "../employee/employee.service";
import { LogupService } from "../logup/logup.service";

export type MonthYearObjectType = {
  month: string;
  year: string;
};

export type timesheetDayDetailType = {
  date: string;
  day: string;
  timeOfCheckin: string;
  timeOfCheckout: string;
  hour: number;
  OT: number;
  leave: boolean;
};

export class TimeSheetService {
  employeeService: EmployeeService;
  logupService: LogupService;
  constructor() {
    this.employeeService = new EmployeeService();
    this.logupService = new LogupService();
  }

  sortMonthYear(a: MonthYearObjectType, b: MonthYearObjectType) {
    if (+a.year >= +b.year) {
      if (+a.month >= +b.month) {
        return 0;
      }
      return -1;
    }
    return -1;
  }

  async findTimeSheetMonthYearList(employeeId: number) {
    const result = await this.logupService.getDistinctMonthYear(employeeId);

    return result.sort(this.sortMonthYear).map((item) => {
      return item.month + "-" + item.year;
    });
  }

  dayOfWeekToText(dayOfWeek: number) {
    switch (dayOfWeek) {
      case 0:
        return "Sunday";
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      default:
        return "";
    }
  }
  timeFormatByDate(date: Date) {
    return date
      ? `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      : "";
  }

  dateFormatByDate(date: Date) {
    const dateText =
      `${date.getDate()}`.length < 2
        ? `0${date.getDate()}`
        : `${date.getDate()}`;

    const monthText =
      `${date.getMonth() + 1}`.length < 2
        ? `0${date.getMonth() + 1}`
        : `${date.getMonth() + 1}`;
    return `${dateText}-${monthText}-${date.getFullYear()}`;
  }
  async genTimesheet(employeeId: number, month: number, year: number) {
    const daysInMonth = new Date(year, month, 0).getDate();
    const details: timesheetDayDetailType[] = [];
    let totalDays = 0;
    let totalHours = 0;
    let totalOT = 0;

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDay = new Date(year, month - 1, day);

      const dayOfWeek = currentDay.getDay();
      const dayText = this.dayOfWeekToText(dayOfWeek);
      const detail = {
        date: this.dateFormatByDate(currentDay),
        day: dayText,
        timeOfCheckin: "",
        timeOfCheckout: "",
        hour: 0,
        OT: 0,
        leave: false,
      };

      const logup = await this.logupService.findByPrimaryKey(
        employeeId,
        day,
        month,
        year
      );

      if (logup) {
        detail.timeOfCheckin = this.timeFormatByDate(logup.checkIn);
        detail.timeOfCheckout = this.timeFormatByDate(logup.checkOut);
        detail.hour = logup.hours;
        detail.OT = logup.OTHours;

        totalHours += detail.hour;
        totalOT += detail.OT;
        totalDays++;
      }

      details.push(detail);
    }

    return {
      totalDays,
      totalHours,
      totalOT,
      details,
    };
  }
}
