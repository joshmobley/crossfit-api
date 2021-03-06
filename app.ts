import express, { Request, Response } from "express";
import cors from "cors";
require("dotenv").config();
import authRouter from "./routes/auth";
import postRouter from "./routes/posts";
import scoreRouter from "./routes/scores";
import userRouter from "./routes/users";
import { checkAccessToken } from "./middleware/authorization";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
const port = 3001;

require("./knex");

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the LiftWithFriends API");
});

app.use("/auth", authRouter);
app.use("/posts", checkAccessToken, postRouter);
app.use("/scores", checkAccessToken, scoreRouter);
app.use("/users", checkAccessToken, userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
