import { mongoose } from "../deps.ts";
import personSchema from "../schemas/mongo/personSchema.ts";

const Person = mongoose.model("Person", personSchema);

export default Person;
