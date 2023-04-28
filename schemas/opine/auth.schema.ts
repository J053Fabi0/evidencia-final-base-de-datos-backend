import { Joi } from "../../deps.ts";
import { a } from "./schemaUtils.ts";

export const auth = a(
  Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
  "query",
  { allowUnknown: true }
);
