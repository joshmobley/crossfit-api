import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return knex("posts")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("posts").insert([
        {
          title: "Grippy 15 min AMRAP",
          user_id: 1,
          image_url: "https://placehold.it/800x600",
          scoretype: "amrap",
        },
        {
          title: "Wednesday EMOM",
          user_id: 2,
          image_url: "https://placehold.it/800x600",
          scoretype: "time",
        },
        {
          title: "Deleted by test",
          user_id: 1,
          image_url: "https://placehold.it/800x600",
          scoretype: "time",
        },
      ]);
    });
}
