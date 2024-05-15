"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./config/database");
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const port = process.env.PORT || 3000;
require("dotenv").config();
// app.get("/", (req: Request, res: Response) => {
//   res.send({ data: "Hello this is Type script Poroject" });
// });
app.use("/", index_1.default);
database_1.sequelize.sync().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port} and database is running`);
    });
});
