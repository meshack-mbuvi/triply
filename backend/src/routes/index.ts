import { userSchema } from "@/schemas/user";
import { validate } from "@/utils/validate";
import { Router } from "express";
import userRoutes from "./user";
const router: Router = Router();

router.use("/users", validate(userSchema), userRoutes);

export default router;
