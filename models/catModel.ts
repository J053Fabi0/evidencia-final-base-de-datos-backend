import { mongoose } from "../deps.ts";
import catSchema from "../schemas/mongo/catSchema.ts";

const Cat = mongoose.model("Cat", catSchema);

export default Cat;
