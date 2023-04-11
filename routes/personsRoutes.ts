import { Router } from "../deps.ts";
import * as s from "../schemas/opine/personsSchemas.ts";
import * as c from "../controllers/opine/personsControllers.ts";

const personsRoutes = Router();

personsRoutes.get("/person", s.getPerson, c.getPerson);
personsRoutes.get("/persons", s.getPersons, c.getPersons);

personsRoutes.post("/person", s.postPerson, c.postPerson);
personsRoutes.patch("/person", s.updatePerson, c.updatePerson);
personsRoutes.delete("/person", s.deletePerson, c.deletePerson);

export default personsRoutes;
