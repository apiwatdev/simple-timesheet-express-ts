import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Employee } from "./Employee";

@Entity()
export class LogUp {
  @PrimaryColumn("int")
  day: number;

  @PrimaryColumn("int")
  month: number;

  @PrimaryColumn("int")
  year: number;

  @Column({ type: "datetime", nullable: true })
  checkIn: Date;
  @Column({ type: "datetime", nullable: true })
  checkOut: Date;
  @Column({ type: "tinyint", nullable: true })
  hours: number;
  @Column({ type: "tinyint", nullable: true })
  OTHours: number;

  @CreateDateColumn()
  created_at: Date;
  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Employee, (employee) => employee.logups)
  employee: Employee;
}
