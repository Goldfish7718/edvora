"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enrolmentSchema = void 0;
const zod_1 = require("zod");
exports.enrolmentSchema = zod_1.z.object({
    userId: zod_1.z.number(),
    courseId: zod_1.z.number(),
});
