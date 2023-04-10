import { Schema } from "../deps.ts";

const catSchema = new Schema({
  name: String,
  owner: { type: Schema.Types.ObjectId, ref: "Person", index: true },
});

export default catSchema;
