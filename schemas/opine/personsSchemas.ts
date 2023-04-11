import { Joi } from "../../deps.ts";
import { a } from "./schemaUtils.ts";

const id = Joi.string().regex(/^[0-9a-fA-F]{24}$/);
const name = Joi.string().min(2).max(30);
const age = Joi.number().integer().min(0).max(120);

export const getPerson = a(
  Joi.object({
    name,
    id: Joi.string(),
  }).xor("name", "id"),
  "query"
);
export const getPersons = a(
  Joi.object({
    names: Joi.array().items(name),
    ids: Joi.array().items(id),
  })
);
export const postPerson = a(
  Joi.object({
    name: name.required(),
    age: age.required(),
  })
);

export const updatePerson = a(
  Joi.object({
    id,
    age,
    name,
  }).custom((value, helpers) => {
    if (value.id) {
      if (!value.name && !value.age)
        return helpers.error("object.missing", {
          peers: ["name", "age"],
          peersWithLabels: ["name", "age"],
        });
    } else {
      const schema = Joi.object({ name: name.required(), age: age.required() });
      const { error } = schema.validate(value);
      if (error) {
        const { type, context, path, message } = error.details[0];
        const newError = helpers.error(type, context);
        newError.message = message + " when no id is given";
        newError.path = path.map((p) => p.toString());
        return newError;
      }
    }
    return value;
  })
);

export const deletePerson = a(Joi.object({ id, name }).xor("name", "id"));
