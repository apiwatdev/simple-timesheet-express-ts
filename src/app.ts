import express, { Request, Response } from "express";
import { errorMiddleware } from "./middlewear";
import { createRouters } from "./routes";
export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(createRouters());
  app.get("", (req: Request, res: Response) => {
    res.send("Simple timesheet api");
  });

  app.use(errorMiddleware);

  return app;
};
