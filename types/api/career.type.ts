import CommonRequest from "../commonRequest.type.ts";

export type GetCareers = CommonRequest;

export type PostCareer = CommonRequest<{ name: string }>;

export type DeleteCareer = CommonRequest<undefined, undefined, { _id: string }>;

export type UpdateCareer = CommonRequest<{ _id: string; name: string }>;
