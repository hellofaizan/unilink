import * as z from "zod";

export const waitlist = z.object({
  email: z.email({
    error: "Invalid email address",
  }),
});

export const login = z.object({
  email: z.email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(20, {
      message: "Password must be at most 20 characters",
    })
    .regex(/^[a-zA-Z0-9_@]*$/, {
      message: "Only alphabets, underscore and @ allowed in password",
    }),
});

export const signup = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(30, {
      message: "Name must be at most 30 characters",
    }),
  email: z.email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(20, {
      message: "Password must be at most 20 characters",
    })
    .regex(/^[a-zA-Z0-9_@]*$/, {
      message: "Only alphabets, underscore and @ allowed in password",
    }),
});

export const forgotSchema = z.object({
  email: z.email({
    message: "Invalid email address",
  }),
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(20, {
      message: "Password must be at most 20 characters",
    })
    .regex(/^[a-zA-Z0-9_@]*$/, {
      message: "Only alphabets, underscore and @ allowed in password",
    }),
});

export const ChangePasswordSchema = z.object({
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters",
    })
    .max(20, {
      message: "Password must be at most 20 characters",
    })
    .regex(/^[a-zA-Z0-9_@]*$/, {
      message: "Only alphabets, underscore and @ allowed in password",
    }),
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(30).optional(),
  bio: z.string().max(50).optional(),
  username: z
    .string()
    .min(1, "Username must be atleast 1 character")
    .max(20)
    .regex(/^[a-zA-Z0-9-]{1,20}$/, {
      message: "Only letters, numbers, and hyphen are allowed",
    })
    .optional(),
});
