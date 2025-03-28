import { Router } from "express";
import { UserController } from "../controllers/user";
import { auth } from "../middleware/auth";
import { userSchema } from "../schemas/user";
import { validate } from "../utils/validate";
import { asyncHandler } from "./utils";

const router: Router = Router();

router.post(
  "/signup",
  validate(userSchema),
  asyncHandler(UserController.signup)
);
router.post("/login", asyncHandler(UserController.login));
router.patch("/profile", auth, asyncHandler(UserController.profile));
router.get("/me", auth, asyncHandler(UserController.getUserDetails));

export default router;
