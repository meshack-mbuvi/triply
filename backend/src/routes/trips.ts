import { TripController } from "@/controllers/trip";
import { tripSchema } from "@/schemas/trip";
import { validate } from "@/utils/validate";
import { Router } from "express";
import { asyncHandler } from "./utils";

const router: Router = Router();

router.post("/", validate(tripSchema), asyncHandler(TripController.createTrip));
router.get("/", asyncHandler(TripController.getTrips));

export default router;
