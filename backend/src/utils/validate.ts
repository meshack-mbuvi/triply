import { NextFunction, Request, Response } from "express";
import * as yup from "yup";

export const validate =
  (schema: yup.ObjectSchema<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate(req.body, { abortEarly: false }); // Validate the request body
      next(); // Proceed to the next middleware or route
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        res.status(400).json({ errors: error.errors }); // Return validation errors
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
