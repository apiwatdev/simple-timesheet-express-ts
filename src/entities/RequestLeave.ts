import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { RequestLeaveType, RequestLeaveStatus } from "../enum";
import { Employee } from "./Employee";

@Entity()
export class RequestLeave {
  @PrimaryGeneratedColumn()
  requestLeaveId: number;

  @Column("datetime")
  startDate: Date;

  @Column("datetime")
  endDate: Date;

  @Column("text")
  status: RequestLeaveStatus;

  @Column("text")
  leaveType: RequestLeaveType;

  @ManyToMany(() => Employee, (employee) => employee.requestLeaves)
  employee: Employee;
}
