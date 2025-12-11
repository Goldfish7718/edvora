import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
} from "../controllers/course.controllers";
import { verifyToken } from "../middleware/verifyToken";
import { verifyAdmin } from "../middleware/verifyAdmin";

const router = Router();

router.post("/", verifyAdmin, createCourse);

router.get("/", verifyToken, getCourses);
router.get("/:id", verifyToken, getCourse);
router.delete("/:id", verifyAdmin, deleteCourse);

export default router;
