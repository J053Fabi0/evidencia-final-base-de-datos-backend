import { Schema } from "../../deps.ts";

const adminSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: false },
});

export default adminSchema;
