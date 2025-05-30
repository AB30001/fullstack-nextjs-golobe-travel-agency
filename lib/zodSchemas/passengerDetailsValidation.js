import { z } from "zod";

export const passengerDetailsValidation = z.object({
  passengerType: z.enum(["Adult", "Child", "Infant"], {
    message: "Only 'Adult', 'Child' and 'Infant' are allowed",
    required_error: "Passenger type is required",
  }),
  title: z.string().optional(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().date("Invalid date string"),
  passportNumber: z.string().min(1, "Passport number is required"),
  passportExpiryDate: z.string().date("Invalid date string"),
  country: z.string().min(1, "Country is required"),
  flightClass: z
    .enum(["economy", "premium_economy", "business", "first"], {
      message:
        "Only 'economy', 'premium_economy', 'business' and 'first' are allowed",
      required_error: "Flight class is required",
    })
    .optional(),
  gender: z.enum(["male", "female"], {
    message: "Only 'male' and 'female' are allowed",
    required_error: "Gender is required",
  }),
  frequentFlyerAirline: z.string().optional(),
  frequentFlyerNumber: z.string().optional(),
  phoneNumber: z.object({
    dialCode: z.string().min(1, "Calling code is required"),
    number: z
      .string()
      .regex(/^\d+$/, "Invalid phone number. Only numbers are allowed")
      .min(1, "Phone number is required"),
  }),
  email: z.string().email("Invalid email address"),
  isPrimary: z.boolean(),
  metaData: z.optional(),
});

export default function validatePassengerDetails(obj) {
  const { success: s, error, data } = passengerDetailsValidation.safeParse(obj);
  const errors = {};
  let success = s;
  if (s === false) {
    error.issues.forEach((issue) => {
      errors[issue.path[0]] = issue.message;
    });
  }
  return { success, errors, data };
}
