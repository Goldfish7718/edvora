"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseSchema = void 0;
const zod_1 = require("zod");
exports.courseSchema = zod_1.z.object({
    title: zod_1.z.string().max(150).min(5),
    description: zod_1.z.string().max(500).min(10),
    instructor: zod_1.z.string(),
    enrolmentCount: zod_1.z.number().default(0),
});
