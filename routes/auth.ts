import { Request, Response, Router } from "express";
const router = Router();
import { createUser, getUser } from "../controllers/auth";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password, name, avatar } = req.body;
  try {
    const newUser = await createUser(email, password, name, avatar);
    res.send(newUser);
  } catch (err) {
    res.status(403).send(err);
  }
});

router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email, password);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.send({
      ...user,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    res.status(403).send(err);
  }
});

export default router;
