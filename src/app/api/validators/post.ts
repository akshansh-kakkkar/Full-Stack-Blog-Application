import { title } from "process";
import {z} from "zod";
export const createPostSchema = z.object({
    title : z
    .string()
    .min(3, "title too short")
    .max(100),
    content : z
    .string()
    .min(10, "content too short"),
    image : z
    .string()
    .url("Invalid image url")
})

export const updatePostSchema = z.object({
    title : z
    .string()
    .min(3, "Title too short")
    .max(100)
    .optional(),
    content : z
    .string()
    .min(10, "content too short")
    .optional(),
    image : z
    .string()
    .url()
    .optional()
})