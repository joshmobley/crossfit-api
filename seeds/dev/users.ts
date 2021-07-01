import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Josh Mobley",
          email: "jmob1986@gmail.com",
          password: "test123",
          avatar: "https://placehold.it/300x300",
        },
        {
          name: "Shaade Tavares",
          email: "shaadet@gmail.com",
          password: "test123",
          avatar: "https://placehold.it/400x400",
        },
      ]);
    });
}
