import { Schema } from "../../deps.ts";

const personSchema = new Schema({
  // name is unique
  name: { type: String, required: true, unique: true },
  age: { type: String, required: true },
});

export default personSchema;
