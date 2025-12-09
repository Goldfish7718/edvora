import { z } from "zod";

export const enrolmentSchema = z.object({
  userId: z.number(),
  courseId: z.number(),
});

export type EnrolmentType = z.infer<typeof enrolmentSchema>;
