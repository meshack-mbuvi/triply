import { Router } from "express";
import { TripController } from "../controllers/trip";
import { tripSchema, updateTripSchema } from "../schemas/trip";
import { validate } from "../utils/validate";
import { asyncHandler } from "./utils";

const router: Router = Router();

router.post("/", validate(tripSchema), asyncHandler(TripController.createTrip));

router.get("/filter", asyncHandler(TripController.filterTrips));
router.get("/", asyncHandler(TripController.getTrips));
router.get("/:id", asyncHandler(TripController.getOneTrip));

router.patch(
  "/:id",
  validate(updateTripSchema),
  asyncHandler(TripController.editTrip)
);
router.delete("/:id", asyncHandler(TripController.deleteTrip));

export default router;
