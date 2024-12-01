import Jwt from 'jsonwebtoken';
import log from './logger';
import argon2 from 'argon2';
import AppError from './AppError';

// export const signJwt = (object: object, options?: Jwt.SignOptions | undefined) => {
//   return Jwt.sign(object, process.env.JWT_SECRET!, {
//     ...(options && options),
//   });
// };

/** @description verify jwt & payload */
export const verifyJwt = <T>(token: string): T | null => {
  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRET!) as T;
    return decoded;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    log.error(error);
    throw new AppError(`${error.message}`, 401);
  }
};

/** @description sign jwt and return token valid to process.env.JWT_EXPIRES value */
export const signJWT = (id: string, options?: Jwt.SignOptions | undefined) => {
  const token = Jwt.sign({ id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES as string,
    ...(options && options),
  });

  return token;
};

/** @description verify if password is correct using argon2 */
export const correctPassword = async (candidatePassword: string, password: string) => {
  try {
    return await argon2.verify(password, candidatePassword);
  } catch (error) {
    log.error(error, 'Could not validate password');

    return false;
  }
};

export const changedPasswordAfter = (jwtTimeStamp: number, updatedAt: Date): boolean => {
  const updateTimestamp = Math.floor(updatedAt.getTime() / 1000);

  if (updateTimestamp > jwtTimeStamp) {
    return true;
  }

  return false;
};
