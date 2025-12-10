import { Router } from "express";
import {
  createUser,
  getUser,
  getUsers,
  login,
} from "../controllers/user.controllers";
import { verifyAdmin } from "../middleware/verifyAdmin";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.get("/", verifyAdmin, getUsers);
router.get("/:id", verifyToken, getUser);
router.post("/", createUser);
router.post("/login", login);

export default router;
