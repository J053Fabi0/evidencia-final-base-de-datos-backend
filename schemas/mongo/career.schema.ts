import { Schema } from "../../deps.ts";

const careerSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export default careerSchema;
