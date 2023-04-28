import { mongoose } from "../deps.ts";
import studentSchema from "../schemas/mongo/student.schema.ts";

const Student = mongoose.model("Student", studentSchema);

export default Student;
