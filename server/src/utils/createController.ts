import { NextFunction, Request, Response } from "express";
import { ExtendedRequest } from "../middleware/verifyToken";

type Controller<TReq = ExtendedRequest, TRes = Response> = (
  req: TReq,
  res: TRes,
  next: NextFunction
) => void | Promise<void>;

const createController = <TReq = ExtendedRequest, TRes = Response>(
  controllerFn: Controller<TReq, TRes>
) => {
  return (req: TReq, res: TRes, next: NextFunction) => {
    return controllerFn(req, res, next);
  };
};

export default createController;
