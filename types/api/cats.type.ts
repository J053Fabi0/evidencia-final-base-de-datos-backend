import CommonRequest from "../commonRequest.type.ts";

export type GetCat = CommonRequest<undefined, { _id: string }>;

export type GetCats = CommonRequest;

export type PostCat = CommonRequest<{ name: string; owner: string | null }>;

export type UpdateCat = CommonRequest<{ _id: string; name?: string; owner?: string | null }>;

export type DeleteCat = CommonRequest<{ _id: string }>;
