import CommonRequest from "../commonRequest.type.ts";

export type GetPerson = CommonRequest<undefined, { _id: string } | { name: string }>;

export type GetPersons = CommonRequest;

export type PostPerson = CommonRequest<{ name: string; age: string }>;

export type DeletePerson = CommonRequest<{ _id: string } | { name: string }>;

export type UpdatePerson = CommonRequest<
  | { _id: string; name?: string; age?: string }
  //
  | { _id: undefined; name: string; age: string }
>;
