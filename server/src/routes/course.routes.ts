import { Router } from "express";
import { createCourse, getCourses } from "../controllers/course.controllers";
import { verifyToken } from "../middleware/verifyToken";
import { verifyAdmin } from "../middleware/verifyAdmin";

const router = Router();

router.post("/", verifyAdmin, createCourse);
router.get("/", verifyToken, getCourses);

export default router;
