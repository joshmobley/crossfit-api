import Score from "../models/score";

const getScores = async (): Promise<Array<Score>> => {
  const posts = await Score.query();
  return posts;
};

const getScore = async (id: number): Promise<Score> => {
  const post = await Score.query().findById(id);
  return post;
};

const createScore = async (
  post_id: number,
  user_id: number,
  value: string,
  comment?: string
): Promise<Score> => {
  const newScore = await Score.query().insert({
    post_id,
    user_id,
    value,
    comment,
  });
  return newScore;
};

const updateScore = async (
  id: number,
  user_id: number,
  value?: string,
  comment?: string
): Promise<Score> => {
  const updatedPost = await Score.query()
    .findById(id)
    .where("user_id", user_id)
    .patchAndFetchById(id, {
      value,
      comment,
    });
  return updatedPost;
};

const deleteScore = async (id: number, user_id: number): Promise<number> => {
  const deletedPost = await Score.query()
    .where("user_id", user_id)
    .deleteById(id);
  return deletedPost;
};

const getScoresByPost = async (id: number): Promise<Array<Score>> => {
  const postScores = await Score.query()
    .select(
      "scores.*",
      "users.name as score_user_name",
      "users.avatar as score_user_avatar"
    )
    .where("post_id", id)
    .join("users", "scores.user_id", "users.id");
  return postScores;
};

const getScoresByUser = async (id: number): Promise<Array<Score>> => {
  const userScores = await Score.query()
    .select(
      "scores.*",
      "posts.title as post_title",
      "posts.image_url as post_image_url",
      "posts.text as post_text",
      "score_user.name as score_user_name",
      "score_user.avatar as score_user_avatar",
      "post_user.id as post_user_id",
      "post_user.name as post_user_name",
      "post_user.avatar as post_user_avatar"
    )
    .where("scores.user_id", id)
    .join("posts", "scores.post_id", "posts.id")
    .join("users as score_user", "scores.user_id", "score_user.id")
    .join("users as post_user", "posts.user_id", "post_user.id");

  return userScores;
};

export {
  getScores,
  getScore,
  createScore,
  updateScore,
  deleteScore,
  getScoresByPost,
  getScoresByUser,
};
