import { AppDataSource } from "@/config/data-source";
import { Trip } from "@/entities/trip.entity";
import { Request, Response } from "express";

export class TripController {
  static async createTrip(req: Request, res: Response) {
    try {
      const {
        title,
        description,
        origin,
        destination,
        startDate,
        endDate,
        price,
      } = req.body;
      const user = req.body.user; // Extracted from auth middleware

      if (
        !title ||
        !description ||
        !origin ||
        !destination ||
        !startDate ||
        !endDate ||
        !price
      ) {
        return res.status(400).json({ message: "All fields are required" });
      }

      const tripRepository = AppDataSource.getRepository(Trip);

      const newTrip = tripRepository.create({
        title,
        description,
        origin,
        destination,
        startDate,
        endDate,
        price,
        user: user.id, // Associate trip with authenticated user
      });

      await tripRepository.save(newTrip);

      return res.status(201).json({
        message: "Trip created successfully",
        trip: newTrip,
      });
    } catch (error) {
      console.error("Error creating trip:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
