import { z } from "zod";

export const userAddressSchema = z.object({
  streetAddress: z
    .string({ required_error: "Street Address is required" })
    .nonempty("Street Address is required"),
  city: z
    .string({ required_error: "City is required" })
    .nonempty("City is required"),
  state: z
    .string({ required_error: "State is required" })
    .nonempty("State is required"),
  zipCode: z
    .string({ required_error: "ZIP Code is required" })
    .nonempty("ZIP Code is required"),
});

export const userSchema = z.object({
  email: z
    .string({ required_error: "Field password is required" })
    .email()
    .nonempty("Field email is required"),
  password: z
    .string({ required_error: "Field password is required" })
    .min(8, "Password must contain at lest 8 characters")
    .max(16, "Password must contain up to 16 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[\W_]/, "Password must contain at least one special character")
    .nonempty("Field password is required"),

  aboutMe: z
    .string()
    .max(500, "About Me must contain up to 500 characters")
    .optional(),
  birthDate: z.date().optional(),

  address: userAddressSchema.optional(),
});

export const userPatchSchema = userSchema
  .pick({
    aboutMe: true,
    address: true,
  })
  .merge(
    z.object({
      birthDate: z.string().optional(),
    })
  );
