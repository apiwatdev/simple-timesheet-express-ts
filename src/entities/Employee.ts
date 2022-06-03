import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequestLeave } from "./RequestLeave";
import { Timesheet } from "./Timesheet";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  employeeId: number;

  @Column({
    type: "enum",
    enum: ["Mr", "Mrs", "Ms"],
  })
  subsultion: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  firstname: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  lastname: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  email: string;

  @Column({
    type: "enum",
    enum: ["Man", "Women"],
  })
  gendar: string;

  @Column({
    type: "date",
  })
  birthDate: Date;

  @OneToMany(() => Timesheet, (timesheet) => timesheet.employee)
  timesheets: Timesheet[];

  @OneToMany(() => RequestLeave, (requestLeave) => requestLeave.employee)
  requestLeaves: RequestLeave[];
}
