"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfileData = exports.getCourse = exports.getCourses = exports.createCourse = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const course_model_1 = require("../models/course.model");
const createController_1 = __importDefault(require("../utils/createController"));
const prisma = new client_1.PrismaClient();
exports.createCourse = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { course } = req.body;
        course_model_1.courseSchema.parse(course);
        const newCourse = yield prisma.course.create({ data: course });
        res.json({ newCourse });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error });
        }
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.getCourses = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield prisma.course.findMany();
        res.json({ courses });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.getCourse = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id: idString } = req.params;
        const courseId = parseInt(idString);
        const course = yield prisma.course.findUnique({ where: { id: courseId } });
        const enrolment = yield prisma.enrolment.findUnique({
            where: {
                userId_courseId: {
                    userId: (_a = req.decode) === null || _a === void 0 ? void 0 : _a.id,
                    courseId,
                },
            },
        });
        if (!course)
            res.status(404).json({ message: "Course not found" });
        let newCourse;
        if (!enrolment)
            newCourse = Object.assign(Object.assign({}, course), { isEnrolled: false });
        else
            newCourse = Object.assign(Object.assign({}, course), { isEnrolled: true });
        res.status(200).json({ course: newCourse });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.getProfileData = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: userIdString } = req.params;
        const userId = parseInt(userIdString);
        const profileData = yield prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                enrolments: {
                    select: {
                        course: true,
                    },
                },
            },
        });
        const flatEnrollments = profileData === null || profileData === void 0 ? void 0 : profileData.enrolments.map((e) => e.course);
        const profile = Object.assign(Object.assign({}, profileData), { enrolments: flatEnrollments });
        res.status(200).json({ profile });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}));
