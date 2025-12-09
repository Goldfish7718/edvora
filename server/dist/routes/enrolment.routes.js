"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrolment_controllers_1 = require("../controllers/enrolment.controllers");
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.post("/", verifyToken_1.verifyToken, enrolment_controllers_1.createEnrolment);
router.delete("/", verifyToken_1.verifyToken, enrolment_controllers_1.deleteEnrolment);
exports.default = router;
