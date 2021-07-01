import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return knex("scores")
    .del()
    .then(() => {
      return knex("scores").insert([
        { user_id: 1, post_id: 1, value: "40", comment: "That was hard!" },
        { user_id: 2, post_id: 1, value: "30", comment: "I hated it." },
      ]);
    });
}
