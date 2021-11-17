import { Request, Response, Router } from "express";
const router = Router();
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  updatePost,
} from "../controllers/posts";
import { getScoresByPost } from "../controllers/scores";

router.get("/", async (req: Request, res: Response) => {
  const posts = await getPosts();
  res.send(posts);
});

router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const post = await getPost(parseInt(id));
  res.send(post);
});

router.post("/", async (req: Request, res: Response) => {
  const { title, text, scoretype } = req.body;
  const user_id = req["user_id"];

  try {
    const newPost = await createPost(title, text, scoretype, user_id);
    res.send(newPost);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch("/:id", async (req: Request, res: Response) => {
  const { title, text, scoretype } = req.body;
  const { id } = req.params;
  const user_id = req["user_id"];
  try {
    const post = await updatePost(
      parseInt(id),
      user_id,
      title,
      text,
      scoretype
    );
    res.send(post);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const user_id = req["user_id"];
  try {
    const postDeleted = await deletePost(parseInt(id), user_id);
    if (postDeleted) res.send("post deleted");
    else res.status(403).send("not authorized to delete post");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id/scores", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const scores = await getScoresByPost(parseInt(id));
    res.send(scores);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
