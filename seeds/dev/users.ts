import { Knex } from "knex";
import bcrypt from "bcrypt";

export async function seed(knex: Knex): Promise<void> {
  const salt = bcrypt.genSaltSync(10);
  const hashPassword = (password) => bcrypt.hashSync(password, salt);

  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          name: "Josh Mobley",
          email: "jmob1986@gmail.com",
          password: hashPassword("test123"),
          avatar: "//placehold.it/300x300",
        },
        {
          name: "Shaade Tavares",
          email: "shaadet@gmail.com",
          password: hashPassword("test123"),
          avatar: "//placehold.it/400x400",
        },
      ]);
    });
}
