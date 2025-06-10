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

export const HotlierValidationSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  phone_number: Yup.string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),

  country_code: Yup.string()
    .oneOf(["+91", "+1", "+44", "+61", "+81"], "Invalid country code")
    .required("Country code is required"),
});

export const CommissionValidationSchema = Yup.object().shape({
  type: Yup.string()
    .oneOf(
      [
        "FLIGHT_ONEWAY_DOMESTIC",
        "FLIGHT_ONEWAY_INTERNATIONAL",
        "FLIGHT_ROUNDTRIP_DOMESTIC",
        "FLIGHT_ROUNDTRIP_INTERNATIONAL",
        "FLIGHT_MULTICITY_DOMESTIC",
        "FLIGHT_MULTICITY_INTERNATIONAL",
        "HOTEL_DOMESTIC",
        "HOTEL_INTERNATIONAL"
      ],
      "Invalid type selected"
    )
    .required("Type is required"),

  commission_type: Yup.string()
    .oneOf(["FIXED", "PERCENTAGE"], "Commission type must be FIXED or PERCENTAGE")
    .required("Commission type is required"),

  percentage: Yup.string()
    .matches(
      /^(100(\.00?)?|(\d{1,2})(\.\d{1,2})?)$/,
      "Percentage must be between 0 and 100 with up to two decimal places"
    )
    .required("Percentage is required"),

  status: Yup.boolean()
    .required("Status is required"),
});
