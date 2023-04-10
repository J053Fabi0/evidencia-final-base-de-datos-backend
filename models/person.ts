import { mongoose } from "../deps.ts";
import personSchema from "../schemas/mongo/person.ts";

const Person = mongoose.model("Person", personSchema);

export default Person;
