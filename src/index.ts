import express, { Request, Response } from "express";
import { sequelize } from "./config/database";
import routes from "./routes/index";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
require("dotenv").config();

// app.get("/", (req: Request, res: Response) => {
//   res.send({ data: "Hello this is Type script Poroject" });
// });
app.use("/", routes);

sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(
      `Server running at http://localhost:${port} and database is running`
    );
  });
});
