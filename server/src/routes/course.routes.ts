import { Router } from "express";
import {
  createCourse,
  getCourse,
  getCourses,
} from "../controllers/course.controllers";
import { verifyToken } from "../middleware/verifyToken";
import { verifyAdmin } from "../middleware/verifyAdmin";

const router = Router();

router.post("/", verifyAdmin, createCourse);

router.get("/", verifyToken, getCourses);
router.get("/:id", verifyToken, getCourse);

export default router;
