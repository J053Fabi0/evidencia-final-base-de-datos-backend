import { Joi } from "../../deps.ts";
import { a, id, joi } from "./schemaUtils.ts";

const name = Joi.string().min(2).max(30);

export const getStudent = a(joi.object({ id: id.required() }), "query");

export const getStudents = a(joi.object({}), "query");

export const postStudent = a(
  joi.object({
    name: name.required(),
    owner: id.default(null),
  })
);

export const updateStudent = a(
  joi
    .object({
      id: id.required(),
      name,
      owner: id.allow(null),
    })
    .or("name", "owner")
);

export const deleteStudent = a(joi.object({ id: id.required() }));
