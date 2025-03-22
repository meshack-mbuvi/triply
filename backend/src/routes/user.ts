import { auth } from "@/middleware/auth";
import { userSchema } from "@/schemas/user";
import { validate } from "@/utils/validate";
import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/user";

const router: Router = Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post(
  "/signup",
  validate(userSchema),
  asyncHandler(UserController.signup)
);
router.post("/login", asyncHandler(UserController.login));
router.put("/profile", auth, asyncHandler(UserController.profile));


export default router;
