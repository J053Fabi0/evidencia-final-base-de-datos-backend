import { Types } from "../../deps.ts";
import CommonRequest from "../commonRequest.type.ts";
import Status from "../status.type.ts";

export type Student = {
  name: string;
  status: Status;
  career: string;
  email?: string;
  phone?: string;
  birthDate: Date;
  secondName: string;
  direction?: string;
  _id: string | Types.ObjectId;
};

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

export type UpdateStudent = CommonRequest<{ _id: Student["_id"] } & Partial<Omit<Student, "_id">>>;

export type DeleteStudent = CommonRequest<{ _id: string }>;
