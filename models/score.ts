import { Model } from "../knex";

class Score extends Model {
  id: number;
  value: string;
  comment?: string;
  post_id: number;
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
    return "scores";
  }
}

export default Score;
