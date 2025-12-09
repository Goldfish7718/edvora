import { PrismaClient } from "@prisma/client";
import { ZodError } from "zod";
import { courseSchema, CourseType } from "../models/course.model";
import createController from "../utils/createController";

const prisma = new PrismaClient()

export const createCourse = createController(async (req, res) => {
    try {
        const { course }: { course: CourseType } = req.body

        courseSchema.parse(course)

        const newCourse = await prisma.course.create({ data: course })
        res.json({ newCourse })
    } catch (error) {
        console.log(error);
        if (error instanceof ZodError) {
            res.status(400).json({ error });
        }
        res.json({ message: "Internal server error" })
    }
})

export const getCourses = createController(async (req, res) => {
    try {
        const courses = await prisma.course.findMany()
        res.json({ courses })
    } catch (error) {
        console.log(error);
        res.json({ message: "Internal server error" })
    }
})