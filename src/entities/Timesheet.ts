import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Employee } from "./Employee";
import { LogUp } from "./LogUp";

@Entity()
export class Timesheet {
  @PrimaryGeneratedColumn()
  timesheetId: number;

  @Column({
    type: "tinyint",
  })
  month: number;

  @Column({
    type: "tinyint",
  })
  year: number;

  @ManyToOne(() => Employee, (employee) => employee.timesheets)
  employee: Employee;

  @OneToMany(() => LogUp, (logup) => logup.timesheet)
  logups: LogUp[];
}
