import { mongoose } from "../deps.ts";
import personSchema from "../schemas/person.ts";

const Person = mongoose.model("Person", personSchema);

export default Person;
