import * as yup from "yup";

// Get today's date at midnight (to remove time portion)
const today = new Date();
today.setHours(0, 0, 0, 0);

export const tripSchema = yup.object({
  title: yup.string().required("Title is required").max(100, "Title too long"),
  description: yup.string().required("Description is required"),
  destination: yup.string().required("Destination is required"),
  startDate: yup
    .date()
    .required("Start date is required")
    .min(today, "Start date cannot be in the past"),
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
