import {
  Student,
  GetStudent,
  GetStudents,
  PostStudent,
  UpdateStudent,
  DeleteStudent,
} from "../../types/api/student.type.ts";
import {
  createStudent,
  changeStudent,
  deleteOneStudent,
  getStudent as getStudentCtrl,
  getStudents as getStudentsCtrl,
} from "../../controllers/mongo/student.ts";
import { countCareers } from "../mongo/career.ts";
import handleError from "../../utils/handleError.ts";
import CommonResponse from "../../types/commonResponse.type.ts";

function normalizeStudent<T extends Student>(student: T) {
  return {
    id: student._id,
    name: student.name,
    status: student.status,
    career: student.career,
    birthDate: student.birthDate,
    secondName: student.secondName,
    ...(student.email && { email: student.email }),
    ...(student.phone && { phone: student.phone }),
    ...(student.direction && { direction: student.direction }),
  };
}

export async function getStudent({ query }: GetStudent, res: CommonResponse) {
  const student = await getStudentCtrl(query);
  if (!student) return handleError(res, "Student not found", 404);

  res.send({ message: normalizeStudent(student) });
}

export const getStudents = async (_: GetStudents, res: CommonResponse) =>
  res.send({ message: (await getStudentsCtrl()).map(normalizeStudent) });

export async function postStudent({ body }: PostStudent, res: CommonResponse) {
  const careerCount = await countCareers({ _id: body.career });
  if (careerCount === 0) return handleError(res, "Career not found", 404);

  const newStudent = await createStudent(body);
  res.send({ message: newStudent.id });
}

export async function updateStudent({ body: { _id, ...data } }: UpdateStudent, res: CommonResponse) {
  if (data.career) {
    const careers = await countCareers({ _id: data.career });
    if (careers === 0) return handleError(res, "Career not found", 404);
  }

  const updateStudent = await (async () => {
    const { matchedCount } = await changeStudent({ _id }, data);
    if (matchedCount === 0) return null;
    return await getStudentCtrl({ _id });
  })();

  if (!updateStudent) return handleError(res, "Student not found", 404);
  res.send({ message: normalizeStudent(updateStudent) });
}

export async function deleteStudent({ body }: DeleteStudent, res: CommonResponse) {
  const { deletedCount } = await deleteOneStudent(body);
  if (deletedCount === 0) return handleError(res, "Student not found", 404);

  res.send({ message: "Student deleted" });
}
