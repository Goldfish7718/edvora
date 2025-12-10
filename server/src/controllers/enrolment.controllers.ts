import { PrismaClient } from "@prisma/client";
import createController from "../utils/createController";
import { enrolmentSchema } from "../models/enrolment.model";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export const createEnrolment = createController(
  async (req, res): Promise<any> => {
    try {
      const { userId, courseId } = req.body;

      const [user, course, existingEnrolment] = await Promise.all([
        prisma.user.findUnique({
          where: {
            id: userId,
          },
        }),
        prisma.course.findUnique({
          where: {
            id: courseId,
          },
        }),
        prisma.enrolment.findUnique({
          where: {
            userId_courseId: {
              userId,
              courseId,
            },
          },
        }),
      ]);

      if (existingEnrolment) {
        return res
          .status(409)
          .json({ message: "You are already enrolled in this course" });
      } else if (!user || !course) {
        return res
          .status(404)
          .json({ message: "The course or user does not exist" });
      }

      const enrolment = await prisma.enrolment.create({
        data: {
          userId,
          courseId,
        },
      });

      res.status(201).json({ enrolment });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

export const deleteEnrolment = createController(
  async (req, res): Promise<any> => {
    try {
      const { userId, courseId } = enrolmentSchema.parse(req.body);

      const existingEnrolment = await prisma.enrolment.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      if (!existingEnrolment) {
        return res.status(404).json({ message: "Enrolment not found" });
      }

      await prisma.enrolment.delete({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      res.status(200).json({ message: "Enrolment deleted successfully" });
    } catch (error) {
      console.log(error);
      if (error instanceof ZodError) {
        res.status(400).json({ error });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
