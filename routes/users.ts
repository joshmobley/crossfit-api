import { Request, Response, Router } from "express";
import { getScoresByUser } from "../controllers/scores";
const router = Router();
import {
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/users";
import {
  getFollowers,
  createFollower,
  deleteFollower,
} from "../controllers/followers";

router.get("/", async (req: Request, res: Response) => {
  const users = await getUsers();
  res.send(users);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = await getUser(parseInt(id));
  res.send(user);
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { email, password, name, avatar } = req.body;
  const { id } = req.params;
  const user_id = req["user_id"];
  if (parseInt(user_id) !== parseInt(id))
    return res.status(403).send("user not permitted to take this action");
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
    res.status(403).send(err);
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

router.get("/:id/followers", async (req: Request, res: Response) => {
  try {
    const followers = await getFollowers();
    res.send(followers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/:id/followers", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req["user_id"];
  const { follower_id } = req.body;
  try {
    const follower = await createFollower(
      parseInt(id),
      parseInt(user_id),
      parseInt(follower_id)
    );
    res.send(follower);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete(
  "/:id/followers/:follower_id",
  async (req: Request, res: Response) => {
    const { id, follower_id } = req.params;
    const user_id = req["user_id"];
    try {
      const deletedFollower = await deleteFollower(
        parseInt(id),
        parseInt(user_id),
        parseInt(follower_id)
      );
      if (deletedFollower) res.json({ message: "follower has been deleted" });
      else
        res
          .status(403)
          .json({ error: "user is not authorized to remove follower" });
    } catch (err) {
      res.status(500).send(err.message);
    }
  }
);

export default router;
