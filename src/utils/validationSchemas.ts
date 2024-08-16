import { z } from "zod";

// Create Article Schema
export const createArticleSchema = z.object({
  title: z
    .string({
      required_error: "title is required",
      invalid_type_error: "title should be of type string",
    })
    .min(2, { message: "title should be at least two characters" })
    .max(200, { message: "title should be at most 200 characters" }),
  description: z
    .string({
      required_error: "description is required",
      invalid_type_error: "description should be of type string",
    })
    .min(10, { message: "description should be at least 10 characters" }),
});

// Register Schema
export const registerSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username should be of type string",
    })
    .min(2, { message: "Username should be at least 2 characters" })
    .max(100, { message: "Username should be at most 100 characters" }),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be of type string",
    })
    .email({ message: "Please enter a valid email address" })
    .min(3, { message: "Email should be at least 3 characters" })
    .max(200, { message: "Email should be at most 200 characters" })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be of type string",
    })
    .min(6, { message: "Password should be at least 6 characters" })
    .max(100, { message: "Password should be at most 100 characters" }),
});

// Login Schema
export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be of type string",
    })
    .email({ message: "Please enter a valid email address" })
    .min(3, { message: "Email should be at least 3 characters" })
    .max(200, { message: "Email should be at most 200 characters" })
    .email(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be of type string",
    })
    .min(6, { message: "Password should be at least 6 characters" })
    .max(100, { message: "Password should be at most 100 characters" }),
});

// Create Comment Schema
export const createCommentSchema = z.object({
  text: z
    .string({
      required_error: "Text is required",
      invalid_type_error: "Text should be of type string",
    })
    .min(2, { message: "Text should be at least 2 characters" })
    .max(500, { message: "Text should be at most 500 characters" }),
  articleId: z.number({
    required_error: "Article id is required",
    invalid_type_error: "Article id should be of type number",
  }),
});

// Update User Account Schema
export const updateUserSchema = z.object({
  username: z
    .string({
      required_error: "Username is required",
      invalid_type_error: "Username should be of type string",
    })
    .min(2, { message: "Username should be at least 2 characters" })
    .max(100, { message: "Username should be at most 100 characters" })
    .optional(),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email should be of type string",
    })
    .email({ message: "Please enter a valid email address" })
    .min(3, { message: "Email should be at least 3 characters" })
    .max(200, { message: "Email should be at most 200 characters" })
    .email()
    .optional(),
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password should be of type string",
    })
    .min(6, { message: "Password should be at least 6 characters" })
    .max(100, { message: "Password should be at most 100 characters" })
    .optional(),
});
