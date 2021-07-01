import { Model } from "objection";
import Knex from "knex";
import { development } from "./knexfile";

// Initialize knex.
const knex = Knex(development);

Model.knex(knex);

export { Model, knex };
