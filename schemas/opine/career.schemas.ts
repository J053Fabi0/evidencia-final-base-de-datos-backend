import { Joi } from "../../deps.ts";
import { a, id, joi } from "./schemaUtils.ts";

const name = Joi.string().min(2);

export const getCareers = a(joi.object({}), "query");

export const postCareer = a(
  joi.object({
    name: name.required(),
  })
);

export const updateCareer = a(
  joi.object({
    id: id.required(),
    name: name.required(),
  })
);

export const deleteCareer = a(joi.object({ id: id.required() }));
