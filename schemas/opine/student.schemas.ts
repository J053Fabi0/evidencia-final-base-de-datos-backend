import { Joi } from "../../deps.ts";
import { a, id, joi } from "./schemaUtils.ts";

// This is the maximum date allowed for a student to be registered.
// So that the student is at least 18 years old.
const date18YearsAgo = new Date();
date18YearsAgo.setFullYear(date18YearsAgo.getFullYear() - 18);

const name = Joi.string().min(2).max(40);
const secondName = Joi.string().min(2).max(80);
const birthDate = Joi.date().max(date18YearsAgo);
const status = Joi.string().valid("inscrito", "no inscrito");
const career = id;
const email = Joi.string().email({ tlds: { allow: false } });
const phone = Joi.string().max(20);
const direction = Joi.string().max(200);

export const getStudent = a(joi.object({ id: id.required() }), "query");

export const getStudents = a(joi.object({}), "query");

export const postStudent = a(
  joi.object({
    // required
    name: name.required(),
    status: status.required(),
    career: career.required(),
    birthDate: birthDate.required(),
    secondName: secondName.required(),
    // optional
    email,
    phone,
    direction,
  })
);

export const updateStudent = a(
  joi
    .object({
      id: id.required(),
      name,
      email,
      phone,
      status,
      career,
      birthDate,
      direction,
      secondName,
    })
    .or("name", "status", "career", "birthDate", "secondName", "email", "phone", "direction")
);

export const deleteStudent = a(joi.object({ id: id.required() }));
