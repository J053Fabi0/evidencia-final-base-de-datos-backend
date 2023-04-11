import CommonRequest from "../commonRequest.type.ts";

export type GetPerson = CommonRequest<
  undefined,
  { id: string; name: undefined } | { id: undefined; name: string }
>;

export type GetPersons = CommonRequest<{
  names?: string[];
  ids?: string[];
}>;

export type PostPerson = CommonRequest<{
  name: string;
  age: string;
}>;

export type DeletePerson = CommonRequest<{ id: string; name: undefined } | { id: undefined; name: string }>;

export type UpdatePerson = CommonRequest<
  | { id: string; name?: string; age?: string }
  //
  | { id: undefined; name: string; age: string }
>;
