import Person from "../../models/personModel.ts";

export const getPersons = Person.find.bind(Person);
export const getPerson = Person.findOne.bind(Person);
export const countPersons = Person.count.bind(Person);
export const createPerson = Person.create.bind(Person);
export const changePerson = Person.updateOne.bind(Person);
export const changePersons = Person.updateMany.bind(Person);
export const deleteOnePerson = Person.deleteOne.bind(Person);
export const findAndDeletePerson = Person.findOneAndDelete.bind(Person);
