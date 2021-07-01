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

  static get relationMappings() {
    // Importing models here is a one way to avoid require loops.

    return {
      gyms: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + "/gym",
        join: {
          from: "users.id",
          through: {
            from: "gyms_users.user_id",
            to: "gyms_users.gym_id",
          },
          to: "gyms.id",
        },
      },
    };
  }
}

export default User;
