// Check that all required .env variables are set
const envVariables = ["ALLOWED_URL", "PORT", "MONGO_URI", "MONGO_DATABASE"];
for (const envVariable of envVariables)
  if (Deno.env.get(envVariable) === undefined) console.log(envVariable + " not set in .env."), Deno.exit(0);

import mongoose from "npm:mongoose";

await mongoose.connect(
  "mongodb://josefabio:FLtKHrW3Ciu5z9dAF2a7JYPhqnjm7HPfHeNKzV@localhost:27018/?authMechanism=DEFAULT"
);
