import { Router } from "express";
import { createCourse, getCourses } from "../controllers/course.controllers";

const router = Router()

router.post("/", createCourse)
router.get("/", getCourses)

export default router