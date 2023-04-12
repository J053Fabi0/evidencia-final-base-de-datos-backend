import { a, id, joi } from "./schemaUtils.ts";

export const getCat = a(joi.object({ id: id.required() }), "query");
