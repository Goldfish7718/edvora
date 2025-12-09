import { Router } from "express";
import { createUser, getUsers, login } from "../controllers/user.controllers";
import { verifyAdmin } from "../middleware/verifyAdmin";

const router = Router();

router.get("/", verifyAdmin, getUsers);
router.post("/", createUser);
router.post("/login", login);

export default router;
