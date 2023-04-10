import { Router } from "../deps.ts";
import personsRoutes from "./personsRoutes.ts";

const router = Router();

// Default response.
router.get("/", (_, res) => res.sendStatus(200));

router.use(personsRoutes);

export default router;
