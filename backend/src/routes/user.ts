import { NextFunction, Request, Response, Router } from "express";
import { UserController } from "../controllers/user";

const router: Router = Router();

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    await UserController.signup(req, res);
  }
);

export default router;
