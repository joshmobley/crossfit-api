import { uploadImage } from "../cloudinary";
const image_base64 = require("../mocks/image.js");
import Post, { Scoretype } from "../models/post";

const getPosts = async (): Promise<Array<Post>> => {
  const posts = await Post.query()
    .select(
      "posts.*",
      "users.name as post_user_name",
      "users.avatar as post_user_avatar"
    )
    .join("users", "posts.user_id", "users.id")
    .orderBy("created_at", "desc");
  return posts;
};

const getPost = async (id: number): Promise<Post> => {
  const post = await Post.query()
    .select(
      "posts.*",
      "users.name as post_user_name",
      "users.avatar as post_user_avatar"
    )
    .join("users", "posts.user_id", "users.id")
    .findById(id);
  return post;
};

const createPost = async (
  title: string,
  text: string,
  image: string,
  scoretype: Scoretype,
  user_id: number
): Promise<Post> => {
  console.log({
    title,
    text,
    image,
    scoretype,
    user_id,
  });
  if (!title || !text || !scoretype || !user_id)
    throw "missing required fields";

  let image_url;

  if (image) {
    const { secure_url } = await uploadImage(image);
    image_url = secure_url;
  }

  const newPost = await Post.query().insert({
    title,
    text,
    scoretype,
    image_url,
    user_id,
  });
  return newPost;
};

const updatePost = async (
  id: number,
  user_id: number,
  title?: string,
  text?: string,
  image_url?: string,
  scoretype?: Scoretype
): Promise<Post> => {
  const updatedPost = await Post.query()
    .where("user_id", user_id)
    .patchAndFetchById(id, {
      title,
      text,
      image_url,
      scoretype,
    });
  return updatedPost;
};

const deletePost = async (id: number, user_id: number): Promise<number> => {
  const deletedPost = await Post.query()
    .where("user_id", user_id)
    .deleteById(id);

  return deletedPost;
};

export { getPosts, getPost, createPost, updatePost, deletePost };
