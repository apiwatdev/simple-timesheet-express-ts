import { AppDataSource } from "../db";
import { LogUp } from "../entities";

export const LogUpRepository = AppDataSource.getRepository(LogUp);
