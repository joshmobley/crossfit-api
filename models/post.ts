import { Model } from "../knex";

export type Scoretype = "amrap" | "time" | "weight" | "distance";

class Post extends Model {
  id: number;
  title: string;
  text?: string;
  image_url?: string;
  scoretype: Scoretype;
  user_id: number;
  updated_at: string;
  created_at: string;

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get tableName() {
    return "posts";
  }
}

export default Post;
