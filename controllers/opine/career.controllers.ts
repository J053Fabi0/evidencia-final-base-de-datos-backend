import { createCareer, getCareers as getCareersCtrl } from "../../controllers/mongo/career.ts";
import { PostCareer, GetCareers } from "../../types/api/career.type.ts";
import CommonResponse from "../../types/commonResponse.type.ts";

export const getCareers = async (_: GetCareers, res: CommonResponse) => {
  const careers = (await getCareersCtrl()).map(({ name, _id }) => ({ name, id: _id }));

  res.send({ message: careers });
};

export const postCareer = async ({ body }: PostCareer, res: CommonResponse) => {
  const { name, _id } = await createCareer(body);
  res.send({ message: { name, id: _id } });
};

// export const updateCareer = async ({ body }: UpdateCareer, res: CommonResponse) => {
//   const updatedCareer = await (async () => {
//     if (body._id === undefined) {
//       await changeCareer({ name: body.name }, { age: body.age });
//       return getCareerCtrl({ name: body.name });
//     }

//     await changeCareer(
//       { _id: body._id },
//       {
//         ...(body.name ? { name: body.name } : {}),
//         ...(body.age ? { age: body.age } : {}),
//       }
//     );
//     return getCareerCtrl({ _id: body._id });
//   })();

//   if (!updatedCareer) return handleError(res, "Career not found", 404);
//   res.send({ message: { name: updatedCareer.name, age: updatedCareer.age, id: updatedCareer._id } });
// };

// export const deleteCareer = async ({ body }: DeleteCareer, res: CommonResponse) => {
//   const person = await findAndDeleteCareer(body);
//   if (!person) return handleError(res, "Career not found", 404);

//   // Update all cats that had this person as owner to have no owner
//   await changeStudents({ owner: person._id }, { owner: null });

//   res.send({ message: "Career deleted" });
// };
