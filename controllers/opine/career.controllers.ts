import handleError from "../../utils/handleError.ts";
import CommonResponse from "../../types/commonResponse.type.ts";
import { PostCareer, GetCareers, UpdateCareer } from "../../types/api/career.type.ts";
import { createCareer, getCareers as getCareersCtrl, changeCareer } from "../../controllers/mongo/career.ts";

export const getCareers = async (_: GetCareers, res: CommonResponse) => {
  const careers = (await getCareersCtrl()).map(({ name, _id }) => ({ name, id: _id }));

  res.send({ message: careers });
};

export const postCareer = async ({ body }: PostCareer, res: CommonResponse) => {
  const { name, _id } = await createCareer(body);
  res.send({ message: { name, id: _id } });
};

export const updateCareer = async ({ body }: UpdateCareer, res: CommonResponse) => {
  const updatedCareer = await changeCareer({ _id: body._id }, { name: body.name });

  if (!updatedCareer) return handleError(res, "Career not found", 404);
  res.send({ message: "Done" });
};

// export const deleteCareer = async ({ body }: DeleteCareer, res: CommonResponse) => {
//   const person = await findAndDeleteCareer(body);
//   if (!person) return handleError(res, "Career not found", 404);

//   // Update all cats that had this person as owner to have no owner
//   await changeStudents({ owner: person._id }, { owner: null });

//   res.send({ message: "Career deleted" });
// };
