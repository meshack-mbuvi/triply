import { TripController } from "@/controllers/trip";
import { tripSchema, updateTripSchema } from "@/schemas/trip";
import { validate } from "@/utils/validate";
import { Router } from "express";
import { asyncHandler } from "./utils";

const router: Router = Router();

router.post("/", validate(tripSchema), asyncHandler(TripController.createTrip));
router.get("/", asyncHandler(TripController.getTrips));
router.get("/:id", asyncHandler(TripController.getTrips));
router.patch(
  "/:id",
  validate(updateTripSchema),
  asyncHandler(TripController.editTrip)
);
router.delete("/:id", asyncHandler(TripController.deleteTrip));

export default router;
