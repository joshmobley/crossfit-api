import { Request, Response, Router } from "express";
const router = Router();
import {
  getScores,
  getScore,
  createScore,
  deleteScore,
  updateScore,
} from "../controllers/scores";

router.get("/", async (req: Request, res: Response) => {
  const scores = await getScores();
  res.send(scores);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const score = await getScore(parseInt(id));
  res.send(score);
});

router.post("/", async (req, res) => {
  const { post_id, value, comment } = req.body;
  const user_id = req["user_id"];
  try {
    const newScore = await createScore(post_id, user_id, value, comment);
    res.send(newScore);
  } catch (err) {
    res.status(403).send(err);
  }
});

router.patch("/:id", async (req, res) => {
  const { value, comment } = req.body;
  const { id } = req.params;
  const user_id = req["user_id"];
  try {
    const score = await updateScore(parseInt(id), user_id, value, comment);
    res.send(score);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const user_id = req["user_id"];
  try {
    const deletedScore = await deleteScore(parseInt(id), user_id);
    if (deletedScore) res.send(`score deleted`);
    else res.status(403).send("user not authorized to delete score");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
