import Person from "../models/person.ts";

type FindOneParams = Parameters<typeof Person.findOne>;
type FindParams = Parameters<typeof Person.find>;
type CountDocumentsParams = Parameters<typeof Person.countDocuments>;
type CreateParams = Parameters<typeof Person.create>;
type UpdateOneParams = Parameters<typeof Person.updateOne>;
type UpdateManyParams = Parameters<typeof Person.updateMany>;
type DeleteOneParams = Parameters<typeof Person.deleteOne>;
type FindOneAndDeleteParams = Parameters<typeof Person.findOneAndDelete>;

export const getPerson = (...conditions: FindOneParams) => Person.findOne(...conditions);
export const getPersons = (...conditions: FindParams) => Person.find(...conditions);
export const countPersons = (...conditions: CountDocumentsParams) => Person.countDocuments(...conditions);
export const createPerson = (...conditions: CreateParams) => Person.create(...conditions);
export const changePerson = (...conditions: UpdateOneParams) => Person.updateOne(...conditions);
export const changePersons = (...conditions: UpdateManyParams) => Person.updateMany(...conditions);
export const deleteOnePerson = (...conditions: DeleteOneParams) => Person.deleteOne(...conditions);
export const findAndDeletePerson = (...conditions: FindOneAndDeleteParams) =>
  Person.findOneAndDelete(...conditions);
