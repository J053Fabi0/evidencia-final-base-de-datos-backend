import { NextFunction } from "../deps.ts";
import { AuthRequest } from "../types/api/auth.type.ts";
import { countAdmins } from "../controllers/mongo/admin.ts";
import CommonResponse from "../types/commonResponse.type.ts";

export default async function auth({ query }: AuthRequest, res: CommonResponse, next: NextFunction) {
  // wait a random ammout of time to prevent brute force attacks
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 100));

  const matchingAdmins = await countAdmins({ username: query.username, password: query.password });

  if (matchingAdmins >= 1) next();
  else res.setStatus(401).send({ message: null, error: "Unauthorized" });
}
