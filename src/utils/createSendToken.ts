/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import { signJWT } from './jwt';
import { User } from '@prisma/client';

/** @description create token and send response
 * @example  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      verificationCode: user?.verificationCode,
      createdAt: user?.createdAt,
    },
  });
 */
export const createSendToken = (user: User | any, statusCode: number, res: Response) => {
  const token = signJWT(user.id);
  const cookieOptions = {
    expires: new Date(Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000),
    secure: false,
    httpOnly: true,
  };

  if (process.env.PROJECT_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user: {
        id: user.id,
        firstName: user?.profile.firstName,
        lastName: user?.profile.lastName,
        email: user.email,
        verificationCode: user?.verificationCode,
        createdAt: user?.createdAt,
        phoneNumber: user.profile.phoneNumber,
      },
    },
  });
};
