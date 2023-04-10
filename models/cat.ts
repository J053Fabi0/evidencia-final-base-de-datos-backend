import { mongoose } from "../deps.ts";
import catSchema from "../schemas/cat.ts";

const Cat = mongoose.model("Cat", catSchema);

export default Cat;
