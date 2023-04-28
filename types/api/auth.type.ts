import CommonRequest from "../commonRequest.type.ts";

export type AuthRequest = CommonRequest<undefined, { username: string; password: string }>;
