import CommonRequest from "../../types/commonRequest.type.ts";
import CommonResponse from "../../types/commonResponse.type.ts";
import validateRequest, { Element } from "../../utils/validateRequest.ts";
import { Joi, NextFunction, ObjectSchema, ValidationOptions } from "../../deps.ts";

export const joi = Joi.defaults((schema) => {
  switch (schema.type) {
    case "object":
      return (schema as ObjectSchema).custom((value) => {
        // rename id to _id for every object schema
        if ("id" in value) {
          value._id = value.id;
          delete value.id;
        }
        return value;
      });

    default:
      return schema;
  }
});

const defaultOptions: ValidationOptions = {
  convert: true,
  abortEarly: true, // incluír solo el primer error
  stripUnknown: true, // eliminar los unknown
};

export const a =
  (schema: Joi.Schema, element?: Element, options = defaultOptions) =>
  (req: CommonRequest, res: CommonResponse, next: NextFunction) =>
    validateRequest(req, res, next, schema, element, options);

export const id = joi.string().length(24).hex();
