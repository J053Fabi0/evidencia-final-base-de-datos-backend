import { Schema } from "../deps.ts";

const personSchema = new Schema({
  name: String,
  age: Number,
});

export default personSchema;
