import { Request, Response, Router } from "express";
import { getScoresByUser } from "../controllers/scores";
const router = Router();
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/users");

router.get("/", async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send(users);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUser(parseInt(id));
  res.send(user);
});

router.post("/", async (req: Request, res: Response) => {
  const { email, password, name, avatar } = req.body;
  try {
    const newUser = await createUser(email, password, name, avatar);
    res.send(newUser);
  } catch (err) {
    res.status(403).send(err);
  }
});
router.patch("/:id", async (req: Request, res: Response) => {
  const { email, password, name, avatar } = req.body;
  const { id } = req.params;
  try {
    const user = await updateUser(parseInt(id), email, password, name, avatar);
    res.send(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req["user_id"];
  try {
    await deleteUser(parseInt(id), user_id);
    res.send(`user deleted`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id/scores", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const scores = await getScoresByUser(parseInt(id));
    res.send(scores);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
