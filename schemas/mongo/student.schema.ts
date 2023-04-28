import { Schema } from "../../deps.ts";

const studentSchema = new Schema({
  name: { type: String, required: true },
  birthDate: { type: Date, required: true },
  secondName: { type: String, required: true },
  status: { type: String, enum: ["inscrito", "no inscrito"], required: true },
  career: { type: Schema.Types.ObjectId, ref: "Career", index: true, required: true },

  // optional
  email: String,
  phone: String,
  direction: String,
});

export default studentSchema;
