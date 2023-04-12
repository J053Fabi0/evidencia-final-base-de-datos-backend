import { Router } from "../deps.ts";
import personsRoutes from "./personsRoutes.ts";
import catsRoutes from "./catsRoutes.ts";

const router = Router();

// Default response.
router.get("/", (_, res) => res.sendStatus(200));

router.use(personsRoutes);
router.use(catsRoutes);

export default router;
