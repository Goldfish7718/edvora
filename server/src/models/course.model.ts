import { z } from "zod";

export const courseSchema = z.object({
  title: z.string().max(150).min(5),
  description: z.string().max(500).min(10),
  instructor: z.string(),
  enrolmentCount: z.number().default(0),
  category: z.string(),
});

export type CourseType = z.infer<typeof courseSchema>;
