// IMPORTS
import express, { Request, Response } from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

config();

// ROUTE IMPORTS
import userRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.routes";
import enrolmentRoutes from "./routes/enrolment.routes";

// CONFIG
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// ROUTES
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
app.use("/enrolments", enrolmentRoutes);

// TEST ENDPOINT
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Hello world" });
});

// PORT LISTEN
app.listen(5000, () => {
  console.log(`Server running on port ${PORT}`);
});
