import { Router } from "../deps.ts";
import * as s from "../schemas/opine/student.schemas.ts";
import * as c from "../controllers/opine/student.controllers.ts";

const studentRoutes = Router();

studentRoutes.get("/student", s.getStudent, c.getStudent);
studentRoutes.get("/students", s.getStudents, c.getStudents);

studentRoutes.post("/student", s.postStudent, c.postStudent);

studentRoutes.patch("/student", s.updateStudent, c.updateStudent);

studentRoutes.delete("/student", s.deleteStudent, c.deleteStudent);

export default studentRoutes;
