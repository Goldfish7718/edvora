"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    name: zod_1.z.string().max(50).min(3),
    email: zod_1.z.email(),
    password: zod_1.z
        .string()
        .min(8, "Password must be 8 characters long")
        .regex(/^(?=.*[A-Z])(?=.*\d).+$/, "Password must contain atleast 1 uppercase and 1 Digit"),
    role: zod_1.z.enum(["ADMIN", "STUDENT"]).default("STUDENT"),
});
exports.loginSchema = exports.userSchema.pick({
    email: true,
    password: true,
});
