import { Joi } from "../../deps.ts";
import { a, id, joi } from "./schemaUtils.ts";

const name = Joi.string().min(2).max(30);

export const getCat = a(joi.object({ id: id.required() }), "query");

export const getCats = a(joi.object({}), "query");

export const postCat = a(
  joi.object({
    name: name.required(),
    owner: id.default(null),
  })
);

export const updateCat = a(
  joi
    .object({
      id: id.required(),
      name,
      owner: id,
    })
    .or("name", "owner")
);
