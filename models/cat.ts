import { mongoose } from "../deps.ts";
import catSchema from "../schemas/mongo/cat.ts";

const Cat = mongoose.model("Cat", catSchema);

export default Cat;
