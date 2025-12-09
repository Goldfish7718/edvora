import { PrismaClient } from "@prisma/client";
import { userSchema, UserType } from "../models/user.model";
import createController from "../utils/createController";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export const getUsers = createController(async (req, res): Promise<any> => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users })
  } catch (error) {
    console.log(error);
    res.json({ message: "Internal Server Error" });
  }
});

export const createUser = createController(async (req, res): Promise<any> => {
  try {
    let { user }: { user: UserType } = req.body;

    userSchema.parse(user);

    const potentialUser = await prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (potentialUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    user = {
      ...user,
      password: hashedPassword,
    };

    const newUser = await prisma.user.create({ data: user });
    const { email, name, role }: UserType = newUser;

    const payload = {
      email,
      name,
      role,
    };

    const token = generateToken(payload);

    res
      .status(200)
      .cookie("token", `Bearer ${token}`, {
        httpOnly: true,
        secure: false,
        sameSite: "none",
      })
      .json({ message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error });
    }
    res.json({ message: "Internal Server Error" });
  }
});
