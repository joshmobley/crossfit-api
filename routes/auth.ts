import { Request, Response, Router } from "express";
const router = Router();
import { createUser } from "../controllers/auth";

router.post("/signup", async (req: Request, res: Response) => {
  const { email, password, name, avatar } = req.body;
  try {
    const newUser = await createUser(email, password, name, avatar);
    res.send(newUser);
  } catch (err) {
    res.status(403).send(err);
  }
});

export default router;
