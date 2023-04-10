import CommonResponse from "../../types/commonResponse.type.ts";
import { GetPerson, GetPersons, PostPerson } from "../../types/api/persons.ts";
import {
  getPerson as getPersonCtrl,
  getPersons as getPersonsCtrl,
  createPerson,
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
