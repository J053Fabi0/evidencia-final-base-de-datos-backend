import CommonRequest from "../commonRequest.type.ts";

export type GetStudent = CommonRequest<undefined, { _id: string }>;

export type GetStudents = CommonRequest;

export type PostStudent = CommonRequest<{ name: string; owner: string | null }>;

export type UpdateStudent = CommonRequest<{ _id: string; name?: string; owner?: string | null }>;

export type DeleteStudent = CommonRequest<{ _id: string }>;
