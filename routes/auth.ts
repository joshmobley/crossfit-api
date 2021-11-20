import { Request, Response, Router } from "express";
const router = Router();
import {
  createUser,
  getUser,
  checkUserRefreshToken,
  updateUserRefreshToken,
} from "../controllers/auth";
import {
  generateAccessToken,
  generateRefreshToken,
  generateIDToken,
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
    const accessToken = await generateAccessToken(user);
    const refreshToken = await generateRefreshToken(user);
    const idToken = await generateIDToken(user);

    res.send({
      ...user,
      accessToken,
    });
  } catch (err) {
    res.status(403).send(err);
  }
});

router.post("/refresh", async (req: Request, res: Response) => {
  const { user_id, refreshToken } = req.body;

  if (!user_id)
    return res.status(403).send("User ID cannot be found. Please login again.");
  if (!refreshToken) return res.status(403).send("No token provided.");

  try {
    const accessToken = await checkUserRefreshToken(user_id, refreshToken);
    res.send({
      accessToken,
    });
  } catch (err) {
    res.status(403).send(err);
  }
});

export default router;
