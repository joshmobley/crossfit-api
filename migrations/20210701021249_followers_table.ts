import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("followers", (table) => {
    table.integer("user_id").references("users.id");
    table.integer("following_id").references("users.id");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("followers");
}
