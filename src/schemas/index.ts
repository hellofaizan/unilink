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
    }),
  code: z.optional(z.string()),
});

export const signup = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters",
    })
    .max(25, {
      message: "Name must be at most 25 characters",
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
    }),
});
 