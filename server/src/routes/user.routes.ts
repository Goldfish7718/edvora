import { Router } from "express";
import {
  createUser,
  getCurrentUser,
  getUser,
  getUsers,
  login,
  logout,
} from "../controllers/user.controllers";
import { verifyAdmin } from "../middleware/verifyAdmin";
import { verifyToken } from "../middleware/verifyToken";
import { getProfileData } from "../controllers/course.controllers";

const router = Router();

router.get("/", verifyAdmin, getUsers);
router.get("/current", verifyToken, getCurrentUser);
router.get("/profile/:userId", verifyToken, getProfileData);
router.get("/:id", verifyToken, getUser);

router.post("/", createUser);
router.post("/login", login);
router.post("/logout", verifyToken, logout);

export default router;
