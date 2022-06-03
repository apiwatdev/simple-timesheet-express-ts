import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Timesheet } from "./Timesheet";

@Entity()
export class LogUp {
  @PrimaryGeneratedColumn()
  logUpId: number;

  @Column("datetime")
  logUpDate: Date;

  @Column("datetime")
  checkIn: Date;
  @Column("datetime")
  checkOut: Date;

  @Column("tinyint")
  hours: number;

  @Column("tinyint")
  OTHours: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Timesheet, (timesheet) => timesheet.logups)
  timesheet: Timesheet;
}
