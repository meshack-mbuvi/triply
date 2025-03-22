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
      const tripId = +req.params.id;

      const limit = parseInt(req.query.limit as string, 10) || 10;
      const page = parseInt(req.query.page as string, 10) || 1;
      const tripRepository = AppDataSource.getRepository(Trip);

      // retrieve a single trip for a given user
      if (tripId) {
        const trip = await tripRepository.findOne({
          where: {
            user: { id: user.id },
            id: tripId,
          },
        });
        if (trip) {
          return res.json({
            trip,
          });
        } else {
          return res.status(404).json({
            message: "No trip found with given id",
          });
        }
      }

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

  static async editTrip(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const {
        title,
        description,
        origin,
        destination,
        startDate,
        endDate,
        price,
        user,
      } = req.body;
      const tripRepository = AppDataSource.getRepository(Trip);

      // Find the trip
      const trip = await tripRepository.findOne({
        where: {
          id: parseInt(id, 10),
          user: { id: user.id }, // can only update a trip you own
        },
      });

      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      // Convert startDate and endDate to Date objects for proper comparison
      const newStartDate = startDate ? new Date(startDate) : null;
      const newEndDate = endDate ? new Date(endDate) : null;

      // Validate: startDate must not be after endDate
      if (newStartDate && newEndDate && newStartDate > newEndDate) {
        return res.status(400).json({
          message: "Start date cannot be after the end date.",
        });
      }

      // Update trip fields
      trip.title = title && title.trim() !== "" ? title.trim() : trip.title;
      trip.description =
        description && description.trim() !== ""
          ? description.trim()
          : trip.description;
      trip.origin =
        origin && origin.trim() !== "" ? origin.trim() : trip.origin;
      trip.destination =
        destination && destination.trim() !== ""
          ? destination.trim()
          : trip.destination;
      trip.startDate = newStartDate ? newStartDate : trip.startDate;
      trip.endDate = newEndDate ? newEndDate : trip.endDate;
      trip.price = price !== undefined && !isNaN(price) ? price : trip.price; // Ensure price is valid

      // Save updated trip
      await tripRepository.save(trip);
      return res.status(200).json({
        trip,
        message: "Trip updated successfully",
      });
    } catch (error) {
      console.error("Error updating trip:", error);
      return res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
