import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("posts", (table) => {
    table.increments("id");
    table.string("title");
    table.integer("user_id").references("users.id").notNullable();
    table.string("image_url");
    table.string("text");
    table
      .enum("scoretype", ["weight", "amrap", "time", "distance"])
      .notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("posts");
}
