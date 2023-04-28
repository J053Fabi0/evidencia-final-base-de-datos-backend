import { Router } from "../deps.ts";
// import careerRoutes from "./career.routes.ts";
// import studentRoutes from "./student.routes.ts";

const router = Router();

// Default response.
router.get("/", (_, res) => res.sendStatus(200));

// router.use(careerRoutes);
// router.use(studentRoutes);

export default router;
