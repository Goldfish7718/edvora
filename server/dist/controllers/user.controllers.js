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
exports.getProfileData = exports.logout = exports.getCurrentUser = exports.createUser = exports.getUser = exports.getUsers = exports.login = void 0;
const client_1 = require("@prisma/client");
const user_model_1 = require("../models/user.model");
const createController_1 = __importDefault(require("../utils/createController"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
exports.login = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user: potentialUser } = req.body;
        user_model_1.loginSchema.parse(potentialUser);
        const user = yield prisma.user.findUnique({
            where: { email: potentialUser.email },
        });
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const match = yield bcrypt_1.default.compare(potentialUser.password, user.password);
        if (!match) {
            return res.status(404).json({ message: "Incorrect Credentials" });
        }
        const { email, id, name, role } = user;
        const payload = {
            id,
            email,
            name,
            role,
        };
        const token = (0, generateToken_1.default)(payload);
        res
            .status(200)
            .cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        })
            .json({ message: "Logged in", user: payload });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.getUsers = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json({ users });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.getUser = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: idString } = req.params;
        const id = parseInt(idString);
        const user = yield prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        if (!user) {
            res.status(404).json({ message: "User does not exist" });
        }
        res.json({ user });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.createUser = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { user } = req.body;
        user_model_1.userSchema.parse(user);
        const potentialUser = yield prisma.user.findUnique({
            where: {
                email: user.email,
            },
        });
        if (potentialUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
        user = Object.assign(Object.assign({}, user), { password: hashedPassword });
        const newUser = yield prisma.user.create({
            data: user,
            select: { id: true, email: true, name: true, role: true },
        });
        const { id, email, name, role } = newUser;
        const payload = {
            id,
            email,
            name,
            role,
        };
        const token = (0, generateToken_1.default)(payload);
        res
            .status(200)
            .cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        })
            .json({ message: "Account created successfully", user: newUser });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
exports.getCurrentUser = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.decode;
    res.status(200).json({ user });
}));
exports.logout = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("token").json({ message: "Logged out" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
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
