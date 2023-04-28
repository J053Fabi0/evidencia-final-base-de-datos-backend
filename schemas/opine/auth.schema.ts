import { Joi } from "../../deps.ts";
import { a, joi } from "./schemaUtils.ts";

export const auth = a(
  joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  "query"
);
