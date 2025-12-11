import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { courseSchema, CourseType } from "../models/course.model";
import createController from "../utils/createController";
import { ExtendedRequest } from "../middleware/verifyToken";

const prisma = new PrismaClient();

export const createCourse = createController(async (req, res) => {
  try {
    const { course }: { course: CourseType } = req.body;

    courseSchema.parse(course);

    const newCourse = await prisma.course.create({ data: course });
    res.json({ newCourse });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error });
    }
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getCourses = createController(async (req, res) => {
  try {
    const courses = await prisma.course.findMany();
    res.json({ courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getCourse = createController(async (req, res) => {
  try {
    const { id: idString } = req.params;

    const courseId = parseInt(idString);

    const course = await prisma.course.findUnique({ where: { id: courseId } });
    const enrolment = await prisma.enrolment.findUnique({
      where: {
        userId_courseId: {
          userId: req.decode?.id as number,
          courseId,
        },
      },
    });

    if (!course) res.status(404).json({ message: "Course not found" });

    let newCourse;
    if (!enrolment)
      newCourse = {
        ...course,
        isEnrolled: false,
      };
    else
      newCourse = {
        ...course,
        isEnrolled: true,
      };

    res.status(200).json({ course: newCourse });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export const getProfileData = createController(async (req, res) => {
  try {
    const { userId: userIdString } = req.params;
    const userId = parseInt(userIdString);

    const profileData = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        enrolments: {
          select: {
            course: true,
          },
        },
      },
    });

    const flatEnrollments = profileData?.enrolments.map((e) => e.course);

    const profile = {
      ...profileData,
      enrolments: flatEnrollments,
    };

    res.status(200).json({ profile });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});
