import { PrismaClient } from "@prisma/client";
import {
  loginSchema,
  LoginType,
  userSchema,
  UserType,
} from "../models/user.model";
import createController from "../utils/createController";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export const login = createController(async (req, res): Promise<any> => {
  try {
    const { user: potentialUser }: { user: LoginType } = req.body;
    loginSchema.parse(potentialUser);

    const user = await prisma.user.findUnique({
      where: { email: potentialUser.email },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const match = await bcrypt.compare(potentialUser.password, user.password);

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

    const token = generateToken(payload);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({ message: "Logged in", user: payload });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getUsers = createController(async (req, res): Promise<any> => {
  try {
    const users = await prisma.user.findMany();
    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export const getUser = createController(async (req, res): Promise<any> => {
  try {
    const { id: idString } = req.params;
    const id = parseInt(idString);

    const user = await prisma.user.findUnique({
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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
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

    const newUser = await prisma.user.create({
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

    const token = generateToken(payload);

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({ message: "Account created successfully", user: newUser });
  } catch (error) {
    console.log(error);
    if (error instanceof ZodError) {
      res.status(400).json({ error });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
});
