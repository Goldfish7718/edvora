import { Router } from "express";
import {
  createEnrolment,
  deleteEnrolment,
} from "../controllers/enrolment.controllers";

const router = Router();

router.post("/", createEnrolment);
router.delete("/", deleteEnrolment);

export default router;
