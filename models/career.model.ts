import { mongoose } from "../deps.ts";
import careerSchema from "../schemas/mongo/career.schema.ts";

const Career = mongoose.model("Career", careerSchema);

export default Career;
