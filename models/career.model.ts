import { mongoose } from "../deps.ts";
import adminSchema from "../schemas/mongo/career.schema.ts";

const Career = mongoose.model("Career", adminSchema);

export default Career;
