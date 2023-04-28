import {
  createStudent,
  changeStudent,
  deleteOneStudent,
  getStudent as getStudentCtrl,
  getStudents as getStudentsCtrl,
} from "../../controllers/mongo/cat.ts";
import { getCareer } from "../mongo/person.ts";
import handleError from "../../utils/handleError.ts";
import CommonResponse from "../../types/commonResponse.type.ts";
import { GetStudent, GetStudents, PostStudent, UpdateStudent, DeleteStudent } from "../../types/api/cats.type.ts";

export async function getStudent({ query }: GetStudent, res: CommonResponse) {
  const cat = await getStudentCtrl(query).populate("owner", "name age _id");
  if (!cat) return handleError(res, "Student not found", 404);

  const { _id, name, owner } = cat;
  res.send({
    message: {
      name,
      owner: {
        name: owner.name,
        age: owner.age,
        id: owner.id,
      },
      id: _id,
    },
  });
}

export const getStudents = async (_: GetStudents, res: CommonResponse) =>
  res.send({
    message: (await getStudentsCtrl({}).populate("owner", "name age _id")).map(({ name, owner, _id }) => ({
      name,
      owner: {
        name: owner.name,
        age: owner.age,
        id: owner.id,
      },
      id: _id,
    })),
  });

export async function postStudent({ body }: PostStudent, res: CommonResponse) {
  if (body.owner) {
    const foundOwner = await getCareer({ _id: body.owner });
    if (!foundOwner) return handleError(res, "Owner not found", 404);
  }

  const { _id, name, owner } = await createStudent(body);
  res.send({ message: { id: _id, name, owner } });
}

export async function updateStudent({ body: { _id, ...data } }: UpdateStudent, res: CommonResponse) {
  if (data.owner) {
    const foundOwner = await getCareer({ _id: data.owner });
    if (!foundOwner) return handleError(res, "Owner not found", 404);
  }

  const updateStudent = await (async () => {
    await changeStudent({ _id }, data);
    return await getStudentCtrl({ _id });
  })();

  if (!updateStudent) return handleError(res, "Student not found", 404);
  res.send({ message: { id: updateStudent._id, name: updateStudent.name, owner: updateStudent.owner } });
}

export async function deleteStudent({ body }: DeleteStudent, res: CommonResponse) {
  const cat = await deleteOneStudent(body);
  if (cat.deletedCount === 0) return handleError(res, "Student not found", 404);

  res.send({ message: "Student deleted" });
}
