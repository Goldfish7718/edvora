"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCourses = exports.createCourse = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const course_model_1 = require("../models/course.model");
const createController_1 = __importDefault(
  require("../utils/createController")
);
const prisma = new client_1.PrismaClient();
exports.createCourse = (0, createController_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const { course } = req.body;
      course_model_1.courseSchema.parse(course);
      const newCourse = yield prisma.course.create({ data: course });
      res.json({ newCourse });
    } catch (error) {
      console.log(error);
      if (error instanceof zod_1.ZodError) {
        res.status(400).json({ error });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);
exports.getCourses = (0, createController_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const courses = yield prisma.course.findMany();
      res.json({ courses });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  })
);
