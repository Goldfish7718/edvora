import { NextFunction, Request, Response } from "express";

type Controller<TReq = Request, TRes = Response> = (
  req: TReq,
  res: TRes,
  next: NextFunction
) => void | Promise<void>;

const createController = <TReq = Request, TRes = Response>(
  controllerFn: Controller<TReq, TRes>
) => {
  return (req: TReq, res: TRes, next: NextFunction) => {
    return controllerFn(req, res, next);
  };
};

export default createController;
