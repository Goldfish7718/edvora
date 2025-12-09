"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const course_controllers_1 = require("../controllers/course.controllers");
const router = (0, express_1.Router)();
router.post("/", course_controllers_1.createCourse);
router.get("/", course_controllers_1.getCourses);
exports.default = router;
