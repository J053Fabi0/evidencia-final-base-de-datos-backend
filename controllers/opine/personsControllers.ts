import {
  createPerson,
  changePerson,
  findAndDeletePerson,
  getPerson as getPersonCtrl,
  getPersons as getPersonsCtrl,
} from "../../controllers/mongo/person.ts";
import handleError from "../../utils/handleError.ts";
import { changeCats, getCats } from "../mongo/cat.ts";
import CommonResponse from "../../types/commonResponse.type.ts";
import { GetPerson, GetPersons, PostPerson, UpdatePerson, DeletePerson } from "../../types/api/persons.type.ts";

export const getPerson = async ({ query }: GetPerson, res: CommonResponse) => {
  const person = await getPersonCtrl(query);
  if (!person) return handleError(res, "Person not found", 404);

  const { _id, name, age } = person;
  const cats = (await getCats({ owner: _id }, "name")).map((cat) => ({
    id: cat._id,
    name: cat.name,
  }));

  res.send({ message: { name, age, cats, id: _id } });
};

export const getPersons = async (_: GetPersons, res: CommonResponse) => {
  const persons = (await getPersonsCtrl({})).map(({ name, age, _id }) => ({
    name,
    age,
    cats: [] as { id: typeof _id; name: string }[],
    id: _id,
  }));

  await Promise.all(
    persons.map(
      async (person) =>
        (person.cats = (
          await getCats({ owner: person.id }, "name")
        ).map((cat) => ({ id: cat._id, name: cat.name })))
    )
  );

  res.send({ message: persons });
};

export const postPerson = async ({ body }: PostPerson, res: CommonResponse) => {
  const { name, age, _id } = await createPerson(body);
  res.send({ message: { name, age, id: _id } });
};

export const updatePerson = async ({ body }: UpdatePerson, res: CommonResponse) => {
  const updatedPerson = await (async () => {
    if (body._id === undefined) {
      await changePerson({ name: body.name }, { age: body.age });
      return getPersonCtrl({ name: body.name });
    }

    await changePerson(
      { _id: body._id },
      {
        ...(body.name ? { name: body.name } : {}),
        ...(body.age ? { age: body.age } : {}),
      }
    );
    return getPersonCtrl({ _id: body._id });
  })();

  if (!updatedPerson) return handleError(res, "Person not found", 404);
  res.send({ message: { name: updatedPerson.name, age: updatedPerson.age, id: updatedPerson._id } });
};

export const deletePerson = async ({ body }: DeletePerson, res: CommonResponse) => {
  const person = await findAndDeletePerson(body);
  if (!person) return handleError(res, "Person not found", 404);

  // Update all cats that had this person as owner to have no owner
  await changeCats({ owner: person._id }, { owner: null });

  res.send({ message: "Person deleted" });
};
