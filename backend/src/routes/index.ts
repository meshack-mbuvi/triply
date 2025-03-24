import { Router } from "express";
import tripsRoutes from "./trips";
import userRoutes from "./user";
import { auth } from '../middleware/auth';

const router: Router = Router();

router.use("/users", userRoutes);
router.use("/trips", auth, tripsRoutes);

export default router;
