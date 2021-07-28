import express, { Request, Response } from "express";
import cors from "cors";
require("dotenv").config();
import authRouter from "./routes/auth";
import postRouter from "./routes/posts";
import scoreRouter from "./routes/scores";
import userRouter from "./routes/users";
import { checkToken } from "./middleware/authorization";

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());
const port = 3001;

require("./knex");

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the LiftWithFriends API");
});

app.use("/auth", authRouter);
app.use("/posts", checkToken, postRouter);
app.use("/scores", checkToken, scoreRouter);
app.use("/users", checkToken, userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
