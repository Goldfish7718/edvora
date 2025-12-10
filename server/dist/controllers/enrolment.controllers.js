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
exports.deleteEnrolment = exports.createEnrolment = void 0;
const client_1 = require("@prisma/client");
const createController_1 = __importDefault(require("../utils/createController"));
const enrolment_model_1 = require("../models/enrolment.model");
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
exports.createEnrolment = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId } = req.body;
        const [user, course, existingEnrolment] = yield Promise.all([
            prisma.user.findUnique({
                where: {
                    id: userId,
                },
            }),
            prisma.course.findUnique({
                where: {
                    id: courseId,
                },
            }),
            prisma.enrolment.findUnique({
                where: {
                    userId_courseId: {
                        userId,
                        courseId,
                    },
                },
            }),
        ]);
        if (existingEnrolment) {
            return res
                .status(409)
                .json({ message: "You are already enrolled in this course" });
        }
        else if (!user || !course) {
            return res
                .status(404)
                .json({ message: "The course or user does not exist" });
        }
        const enrolment = yield prisma.enrolment.create({
            data: {
                userId,
                courseId,
            },
        });
        res.status(201).json({ enrolment });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.deleteEnrolment = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, courseId } = enrolment_model_1.enrolmentSchema.parse(req.body);
        const existingEnrolment = yield prisma.enrolment.findUnique({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        if (!existingEnrolment) {
            return res.status(404).json({ message: "Enrolment not found" });
        }
        yield prisma.enrolment.delete({
            where: {
                userId_courseId: {
                    userId,
                    courseId,
                },
            },
        });
        res.status(200).json({ message: "Enrolment deleted successfully" });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
