import { z } from "zod";
export const visibilitySchema = z.enum([
    "PUBLIC",
    "PRIVATE",
    "UNLISTED"
]).optional()

export const createPostSchema = z.object({
    title: z
        .string()
        .min(3, "title too short")
        .max(100),
    content: z
        .string()
        .min(10, "content too short"),
    coverImage: z.array(
        z.string().
        url()).optional(),
    status : z.enum([
        "DRAFT",
        "SCHEDULED",
        "PUBLISHED",
        "ARCHIVED"
    ]).optional(),
    visibility: visibilitySchema.optional(),
    tags: z
        .array(z.string())
        .max(5, "maximum 5 tags are allowed")
        .default([]),
    scheduledAt: z
        .string()
        .datetime()
        .optional(),
})

export const updatePostSchema = z.object({
    title: z
        .string()
        .min(3, "Title too short")
        .max(100)
        .optional(),
    content: z
        .string()
        .min(10, "content too short")
        .optional(),
 coverImage: z.array(
        z.string().
        url()).optional(),
    tags: z
        .array(z.string())
        .max(5)
        .optional()
})

