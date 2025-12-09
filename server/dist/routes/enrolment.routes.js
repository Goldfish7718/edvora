"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const enrolment_controllers_1 = require("../controllers/enrolment.controllers");
const router = (0, express_1.Router)();
router.post("/", enrolment_controllers_1.createEnrolment);
router.delete("/", enrolment_controllers_1.deleteEnrolment);
exports.default = router;
