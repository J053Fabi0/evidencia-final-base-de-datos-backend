import { Router } from "../deps.ts";
import authController from "../middlewares/auth.ts";
import { auth as authSchema } from "../schemas/opine/auth.schema.ts";

// import careerRoutes from "./career.routes.ts";
// import studentRoutes from "./student.routes.ts";

const router = Router();

router.use(authSchema, authController);

// Default response.
router.get("/", (_, res) => res.sendStatus(200));

// router.use(careerRoutes);
// router.use(studentRoutes);

export default router;
