import CommonRequest from "../commonRequest.type.ts";
import Status from "../status.type.ts";

export type GetStudent = CommonRequest<undefined, { _id: string }>;

export type GetStudents = CommonRequest;

export type PostStudent = CommonRequest<{
  name: string;
  birthDate: Date;
  secondName: string;
  status: Status;
  career: string;
  email?: string;
  phone?: string;
  direction?: string;
}>;

export type UpdateStudent = CommonRequest<{ _id: string; name?: string; owner?: string | null }>;

export type DeleteStudent = CommonRequest<{ _id: string }>;
