import * as yup from "yup";

export const tripSchema = yup.object({
  title: yup.string().required("Title is required").max(100, "Title too long"),
  description: yup.string().required("Description is required"),
  origin: yup.string().required("Origin (starting location) is required"),
  destination: yup.string().required("Destination is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: yup
    .date()
    .required("End date is required")
    .min(yup.ref("startDate"), "End date must be after start date"),
  price: yup
    .number()
    .required("Price is required")
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),
});

export const updateTripSchema = yup.object({
  title: yup.string().max(100, "Title too long"),
  description: yup.string(),
  origin: yup.string(),
  destination: yup.string(),
  startDate: yup.date().min(new Date(), "Start date cannot be in the past"),
  endDate: yup
    .date()
    .min(yup.ref("startDate"), "End date must be after start date"),
  price: yup
    .number()
    .positive("Price must be a positive number")
    .min(1, "Price must be at least 1"),
});
