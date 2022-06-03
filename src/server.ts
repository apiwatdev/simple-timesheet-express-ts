import express, { Request, Response } from "express";
import { AppDataSource } from "./db";

const app = express();
const port = 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log("database connecting...");
  })
  .catch((error) => console.log(error));

app.get("", (req: Request, res: Response) => {
  res.send("Simple timesheet api");
});

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});
