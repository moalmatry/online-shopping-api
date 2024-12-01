/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';

type AsyncFunction<P, ResBody, ReqBody, ReqQuery> = (
  req: Request<P, ResBody, ReqBody, ReqQuery> | any,
  res: Response,
  next: NextFunction,
) => Promise<void>;

/** catch all errors in asynchronous function */
export default function <P = object, ResBody = any, ReqBody = any, ReqQuery = any>(
  fn: AsyncFunction<P, ResBody, ReqBody, ReqQuery>,
) {
  return (req: Request<P, ResBody, ReqBody, ReqQuery>, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err) => next(err));
  };
}
