import { userSchema } from "@/schemas/user";
import { validate } from "@/utils/validate";
import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/user";

const router: Router = Router();

router.post(
  "/signup",
  validate(userSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    await UserController.signup(req, res);
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    await UserController.login(req, res);
  }
);

export default router;
