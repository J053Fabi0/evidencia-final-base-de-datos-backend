import { Schema } from "../../deps.ts";

const catSchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "Person", index: true, default: null },
});

export default catSchema;
