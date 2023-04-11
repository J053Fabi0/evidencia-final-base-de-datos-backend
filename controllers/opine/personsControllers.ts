import CommonResponse from "../../types/commonResponse.type.ts";
import { GetPerson, GetPersons, PostPerson, UpdatePerson } from "../../types/api/persons.ts";
import {
  getPerson as getPersonCtrl,
  getPersons as getPersonsCtrl,
  createPerson,
  changePerson,
} from "../../controllers/mongo/person.ts";

export const getPerson = async ({ query }: GetPerson, res: CommonResponse) => {
  const { id, ...personQuery } = query;
  const person = await getPersonCtrl({ ...(id ? { _id: id } : {}), ...personQuery });
  if (!person) return res.setStatus(404).send({ message: "Person not found" });
  const { _id, name, age } = person;
  res.send({ name, age, id: _id });
};

export const getPersons = async ({ body }: GetPersons, res: CommonResponse) =>
  res.send({ persons: (await getPersonsCtrl(body)).map(({ name, age, _id }) => ({ name, age, id: _id })) });

export const postPerson = async ({ body }: PostPerson, res: CommonResponse) => {
  const { name, age, _id } = await createPerson(body);
  res.send({ person: { name, age, id: _id } });
};

export const updatePerson = async ({ body }: UpdatePerson, res: CommonResponse) => {
  const updatedPerson = await (async () => {
    if (body.id === undefined) {
      await changePerson({ name: body.name }, { age: body.age });
      return getPersonCtrl({ name: body.name });
    }

    await changePerson(
      { _id: body.id },
      {
        ...(body.name ? { name: body.name } : {}),
        ...(body.age ? { age: body.age } : {}),
      }
    );
    return getPersonCtrl({ _id: body.id });
  })();

  if (!updatedPerson) return res.setStatus(404).send({ message: "Person not found" });
  res.send({ person: { name: updatedPerson.name, age: updatedPerson.age, id: updatedPerson._id } });
};
