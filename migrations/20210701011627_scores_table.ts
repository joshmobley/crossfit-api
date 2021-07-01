import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("scores", (table) => {
    table.increments("id");
    table.integer("user_id").references("users.id").notNullable();
    table.integer("post_id").references("posts.id").notNullable();
    table.text("value").notNullable();
    table.text("comment");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("scores");
}
