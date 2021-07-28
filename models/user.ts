import { Model } from "../knex";

class User extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  created_at: string;
  updated_at: string;

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get tableName() {
    return "users";
  }
}

export default User;
