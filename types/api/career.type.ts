import CommonRequest from "../commonRequest.type.ts";

export type GetCareer = CommonRequest<undefined, { _id: string } | { name: string }>;

export type GetCareers = CommonRequest;

export type PostCareer = CommonRequest<{ name: string; age: string }>;

export type DeleteCareer = CommonRequest<{ _id: string } | { name: string }>;

export type UpdateCareer = CommonRequest<
  | { _id: string; name?: string; age?: string }
  //
  | { _id: undefined; name: string; age: string }
>;
