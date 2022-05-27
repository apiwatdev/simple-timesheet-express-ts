import express, { Request, Response } from "express";

const app = express();
const port = 3000;
app.get("", (req: Request, res: Response) => {
  res.send("Simple timesheet api");
});

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});
