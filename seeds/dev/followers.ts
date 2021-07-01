import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("followers").del();

  // Inserts seed entries
  await knex("followers").insert([
    { user_id: 1, following_id: 2 },
    { user_id: 2, following_id: 1 },
  ]);
}
