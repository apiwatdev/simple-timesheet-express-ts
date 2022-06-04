import * as db from "./db";
import { createApp } from "./app";

db.initialize();

const port = 3000;

createApp().listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
});
