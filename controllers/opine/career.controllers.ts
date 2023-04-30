import {
  createCareer,
  changeCareer,
  deleteOneCareer,
  getCareers as getCareersCtrl,
} from "../../controllers/mongo/career.ts";
import { countStudents } from "../mongo/student.ts";
import handleError from "../../utils/handleError.ts";
import CommonResponse from "../../types/commonResponse.type.ts";
import allSettleInChunks from "../../utils/allSettledInChunks.ts";
import { PostCareer, GetCareers, UpdateCareer, DeleteCareer } from "../../types/api/career.type.ts";

export const getCareers = async (_: GetCareers, res: CommonResponse) => {
  const careers = (await getCareersCtrl()).map(({ name, _id }) => ({
    name,
    id: _id,
    totalStudents: 0,
    activeStudents: 0,
  }));

  const careersJobs = careers.map((career) => async () => {
    career.totalStudents = await countStudents({ career: career.id });
    career.activeStudents = await countStudents({ career: career.id, status: "inscrito" });
  });
  for (const result of await allSettleInChunks(careersJobs, 10))
    if (result.status === "rejected") console.error(result.reason);

  res.send({ message: careers });
};

export const postCareer = async ({ body }: PostCareer, res: CommonResponse) => {
  const { _id } = await createCareer(body);
  res.send({ message: _id });
};

export const updateCareer = async ({ body }: UpdateCareer, res: CommonResponse) => {
  const updatedCareer = await changeCareer({ _id: body._id }, { name: body.name });

  if (!updatedCareer) return handleError(res, "Career not found", 404);
  res.send({ message: "Done" });
};

export const deleteCareer = async ({ body }: DeleteCareer, res: CommonResponse) => {
  const { deletedCount } = await deleteOneCareer(body);
  if (deletedCount === 0) return handleError(res, "Career not found", 404);

  res.send({ message: "Career deleted" });
};
