import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { LogUp } from "./LogUp";
import { RequestLeave } from "./RequestLeave";

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

  @OneToMany(() => LogUp, (logup) => logup.employee, {
    cascade: true,
  })
  logups: LogUp[];

  @OneToMany(() => RequestLeave, (requestLeave) => requestLeave.employee, {
    cascade: true,
  })
  requestLeaves: RequestLeave[];
}
