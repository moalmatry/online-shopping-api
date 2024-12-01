/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Role } from '@prisma/client';
import { NextFunction, Response } from 'express';
import { CustomRequest } from '../types';
import AppError from '../utils/AppError';

export const restrictTo =
  (...roles: Role[]) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    // @ts-expect-error
    const restrictedRoles = roles.includes(req.user.role);
    if (!restrictedRoles) {
      return next(new AppError("You don't have permission to perform this action", 403));
    }

    next();
  };
