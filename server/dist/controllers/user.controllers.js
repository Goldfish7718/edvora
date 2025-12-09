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
exports.createUser = exports.getUsers = void 0;
const client_1 = require("@prisma/client");
const user_model_1 = require("../models/user.model");
const createController_1 = __importDefault(require("../utils/createController"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const zod_1 = require("zod");
const prisma = new client_1.PrismaClient();
exports.getUsers = (0, createController_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.json({ users });
    }
    catch (error) {
        console.log(error);
        res.json({ message: "Internal Server Error" });
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
        const newUser = yield prisma.user.create({ data: user });
        const { email, name, role } = newUser;
        const payload = {
            email,
            name,
            role,
        };
        const token = (0, generateToken_1.default)(payload);
        res
            .status(200)
            .cookie("token", `Bearer ${token}`, {
            httpOnly: true,
            secure: false,
            sameSite: "none",
        })
            .json({ message: "Account created successfully" });
    }
    catch (error) {
        console.log(error);
        if (error instanceof zod_1.ZodError) {
            res.status(400).json({ error });
        }
        res.json({ message: "Internal Server Error" });
    }
}));
