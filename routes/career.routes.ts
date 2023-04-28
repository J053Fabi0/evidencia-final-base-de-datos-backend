import { Router } from "../deps.ts";
import * as s from "../schemas/opine/career.schemas.ts";
import * as c from "../controllers/opine/career.controllers.ts";

const careerRoutes = Router();

careerRoutes.get("/careers", s.getCareers, c.getCareers);

careerRoutes.post("/career", s.postCareer, c.postCareer);

// careerRoutes.patch("/career", s.updateCareer, c.updateCareer);

// careerRoutes.delete("/career", s.deleteCareer, c.deleteCareer);

export default careerRoutes;
