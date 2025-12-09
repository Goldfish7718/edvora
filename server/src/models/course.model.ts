import { z } from "zod"

export const courseSchema = z.object({
    title: z.string().max(150).min(5),
    description: z.string().max(500).min(10)
})

export type CourseType = z.infer<typeof courseSchema>