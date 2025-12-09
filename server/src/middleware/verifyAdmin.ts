import createController from "../utils/createController";
import { ExtendedRequest } from "./verifyToken";
import jwt from "jsonwebtoken";

export const verifyAdmin = async (
  req: ExtendedRequest,
  res: any,
  next: any
): Promise<any> => {
  try {
    let { token } = req.cookies;

    if (!token)
      return res.status(401).json({
        message: "No Token",
        isAuthenticated: false,
      });

    const decode = jwt.verify(
      token,
      `${process.env.JWT_SECRET}`
    ) as ExtendedRequest["decode"];

    if (decode.role !== "ADMIN")
      return res.status(403).json({
        message: "Forbidden action",
        isAuthenticated: false,
      });

    req.decode = decode as ExtendedRequest["decode"];
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
