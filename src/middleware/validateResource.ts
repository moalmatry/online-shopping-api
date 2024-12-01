import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';
import AppError from '../utils/AppError';

const validateResource = (schema: z.AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  schema
    .parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    })
    .catch((err) => {
      next(new AppError(err.errors[0].message, 400));
    })
    .finally(() => next());
};

export default validateResource;
