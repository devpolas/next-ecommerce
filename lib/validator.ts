import { formateNumberWithDecimal, isValidAmount } from "@/utils/utils";
import { z } from "zod";

// Schema for inserting products
export const insertProductSchema = z.object({
  name: z.string().min(3, "name must be at least 3 characters"),
  slug: z.string().min(3, "slug must be at least 3 characters"),
  category: z.string().min(3, "category must be at least 3 characters"),
  brand: z.string().min(3, "brand must be at least 3 characters"),
  description: z.string().min(10, "description must be at least 10 characters"),
  stock: z.coerce
    .number()
    .int()
    .nonnegative("Stock must be a non-negative integer"),
  images: z.array(z.string()).min(1, "Product must be at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: z
    .string()
    .refine(
      (value) => isValidAmount(formateNumberWithDecimal(Number(value))),
      "Price muse have exactly two decimal places.",
    ),
});

export const signinFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
  callbackURL: z.string().optional(),
});

export const signupFormSchema = z
  .object({
    name: z.string().min(3, "Your name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    passwordConfirm: z
      .string()
      .min(6, "Password must be at least 6 characters"),
    image: z.string("Provide you profile image"),
    callbackURL: z.string().optional(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "password doesn't match",
    path: ["passwordConfirm"],
  });
