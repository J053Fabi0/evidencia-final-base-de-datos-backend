import { opine, opineCors, json, mongoose, NextFunction } from "./deps.ts";

// Check that all required .env variables are set
const envVariables = ["PORT", "MONGO_URI"];
for (const envVariable of envVariables)
  if (Deno.env.get(envVariable) === undefined) console.log(envVariable + " not set in .env."), Deno.exit(0);

// Connect to MongoDB
await mongoose.connect(Deno.env.get("MONGO_URI")!);

const app = opine();
app.use(json());
app.use(opineCors());

import router from "./routes/routes.ts";
import CommonRequest from "./types/commonRequest.type.ts";
import CommonResponse from "./types/commonResponse.type.ts";
import handleError from "./utils/handleError.ts";
app.use("/", router);

// Error handling
// deno-lint-ignore no-explicit-any
app.use(function (err: any, _: CommonRequest, res: CommonResponse, __: NextFunction) {
  handleError(res, err);
});

const port = +Deno.env.get("PORT")!;
app.listen(port, () => console.log(`Listening on: http://localhost:${port}`));

export default app;