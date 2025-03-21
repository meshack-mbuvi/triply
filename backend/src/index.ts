import { pool } from "./database";
import { createApp } from "./lib/app";

const port = process.env.PORT || 8000;

const app = createApp();

app.listen(port, () => {
  pool.query(`SELECT * FROM users`, (err: any, results: any) => {
    if (err) {
      console.log({ err });
    } else {
      console.log({ results });
    }
  });
  console.log(`Server is Fire at https://localhost:${port}`);
});
