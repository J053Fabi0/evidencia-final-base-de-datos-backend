import { Joi } from "../../deps.ts";
import { a, id, joi } from "./schemaUtils.ts";

const name = Joi.string().min(2).max(30);
const age = Joi.number().integer().min(18).max(120);

export const getPerson = a(
  Joi.object({ name, id }).xor("name", "id").unknown().rename("id", "_id", { ignoreUndefined: true, alias: true }),
  "query"
);

export const getPersons = a(
  joi.object({
    names: Joi.array().items(name),
    ids: Joi.array().items(id),
  })
);

export const postPerson = a(
  joi.object({
    name: name.required(),
    age: age.required(),
  })
);

export const updatePerson = a(
  joi
    .object({
      id,
      age,
      name,
    })
    .when(Joi.ref("."), {
      switch: [
        // If id and name are not present, then id or name must be present
        {
          is: Joi.object({ id: Joi.any().forbidden(), name: Joi.any().forbidden() }),
          then: Joi.object({ id: Joi.any(), name: Joi.any() }).or("id", "name"),
        },
        // If id is present, then name or age must be present
        {
          is: Joi.object({ id: Joi.any().required() }),
          then: Joi.object({ name: Joi.any(), age: Joi.any() }).or("name", "age"),
        },
        // If name is present, then age or id must be present
        {
          is: Joi.object({ name: Joi.any().required() }),
          then: Joi.object({ age: Joi.any(), id: Joi.any() }).or("age", "id"),
        },
      ],
    })
);

export const deletePerson = a(joi.object({ id, name }).xor("name", "id"));
