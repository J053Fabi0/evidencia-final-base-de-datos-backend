import {
  createCareer,
  changeCareer,
  findAndDeleteCareer,
  getCareer as getCareerCtrl,
  getCareers as getCareersCtrl,
} from "../../controllers/mongo/person.ts";
import handleError from "../../utils/handleError.ts";
import { changeStudents, getStudents } from "../mongo/cat.ts";
import CommonResponse from "../../types/commonResponse.type.ts";
import { GetCareer, GetCareers, PostCareer, UpdateCareer, DeleteCareer } from "../../types/api/persons.type.ts";

export const getCareer = async ({ query }: GetCareer, res: CommonResponse) => {
  const person = await getCareerCtrl(query);
  if (!person) return handleError(res, "Career not found", 404);

  const { _id, name, age } = person;
  const cats = (await getStudents({ owner: _id }, "name")).map((cat) => ({
    id: cat._id,
    name: cat.name,
  }));

  res.send({ message: { name, age, cats, id: _id } });
};

export const getCareers = async (_: GetCareers, res: CommonResponse) => {
  const persons = (await getCareersCtrl({})).map(({ name, age, _id }) => ({
    name,
    age,
    cats: [] as { id: typeof _id; name: string }[],
    id: _id,
  }));

  await Promise.all(
    persons.map(
      async (person) =>
        (person.cats = (
          await getStudents({ owner: person.id }, "name")
        ).map((cat) => ({ id: cat._id, name: cat.name })))
    )
  );

  res.send({ message: persons });
};

export const postCareer = async ({ body }: PostCareer, res: CommonResponse) => {
  const { name, age, _id } = await createCareer(body);
  res.send({ message: { name, age, id: _id } });
};

export const updateCareer = async ({ body }: UpdateCareer, res: CommonResponse) => {
  const updatedCareer = await (async () => {
    if (body._id === undefined) {
      await changeCareer({ name: body.name }, { age: body.age });
      return getCareerCtrl({ name: body.name });
    }

    await changeCareer(
      { _id: body._id },
      {
        ...(body.name ? { name: body.name } : {}),
        ...(body.age ? { age: body.age } : {}),
      }
    );
    return getCareerCtrl({ _id: body._id });
  })();

  if (!updatedCareer) return handleError(res, "Career not found", 404);
  res.send({ message: { name: updatedCareer.name, age: updatedCareer.age, id: updatedCareer._id } });
};

export const deleteCareer = async ({ body }: DeleteCareer, res: CommonResponse) => {
  const person = await findAndDeleteCareer(body);
  if (!person) return handleError(res, "Career not found", 404);

  // Update all cats that had this person as owner to have no owner
  await changeStudents({ owner: person._id }, { owner: null });

  res.send({ message: "Career deleted" });
};
