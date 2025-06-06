import * as Yup from "yup";

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export const categoryValidationSchema = Yup.object().shape({
  category_name: Yup.string()
    .trim()
    .required("Category name is required")
    .min(2, "Too short")
    .max(50, "Too long"),
  category_image: Yup.array()
    .of(
      Yup.object().shape({
        preview: Yup.string().required(),
        path: Yup.string().required(),
        relativePath: Yup.string().required(),
      })
    )
    .min(1, "Category image is required"),
});

export const packageDayValidationSchema = Yup.object({
  pkgday_duration: Yup.string()
    .required("Trip duration is required")
    .max(50, "Trip duration must be at most 50 characters"),
});

export const amenityValidationSchema = Yup.object({
  amenite_image: Yup.array()
    .min(1, "Amenity image is required")
    .required("Amenity image is required"),
  amenite_name: Yup.string()
    .required("Amenity name is required")
    .max(100, "Amenity name must be at most 100 characters"),
});