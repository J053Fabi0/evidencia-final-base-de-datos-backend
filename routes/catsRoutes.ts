import { Router } from "../deps.ts";
import * as s from "../schemas/opine/catsSchemas.ts";
import * as c from "../controllers/opine/catsControllers.ts";

const catsRoutes = Router();

catsRoutes.get("/cat", s.getCat, c.getCat);
catsRoutes.get("/cats", s.getCats, c.getCats);

catsRoutes.post("/cat", s.postCat, c.postCat);

catsRoutes.patch("/cat", s.updateCat, c.updateCat);

// catsRoutes.delete("/cat", s.deleteCat, c.deleteCat);

export default catsRoutes;
