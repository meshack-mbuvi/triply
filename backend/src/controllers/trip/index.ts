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
        user, // Extracted from auth middleware
      } = req.body;

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

  static async getTrips(req: Request, res: Response) {
    try {
      const { user } = req.body;

      const limit = parseInt(req.query.limit as string, 10) || 10;
      const page = parseInt(req.query.page as string, 10) || 1;
      const tripRepository = AppDataSource.getRepository(Trip);

      const [trips, total] = await tripRepository.findAndCount({
        where: {
          user: { id: user.id },
        },
        take: limit,
        skip: (page - 1) * limit, // skip the previous pages' results
        order: { createdAt: "DESC" }, // Order by newest trips first
      });

      return res.status(200).json({
        trips,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  }
}
