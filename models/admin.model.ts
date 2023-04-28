import { mongoose } from "../deps.ts";
import adminSchema from "../schemas/mongo/admin.schema.ts";

const Career = mongoose.model("Admin", adminSchema);

export default Career;
