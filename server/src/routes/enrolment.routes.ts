import { Router } from "express";
import {
  createEnrolment,
  deleteEnrolment,
} from "../controllers/enrolment.controllers";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/", verifyToken, createEnrolment);
router.delete("/", verifyToken, deleteEnrolment);

export default router;
