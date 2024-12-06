/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import {
  DeleteUserInput,
  GetAllUsersInput,
  GetUserSchema,
  RestoreUserInput,
  UpdateMeInput,
  UpdateUserInput,
} from '../schema/user.schema';
import {
  deleteMe,
  deleteUser,
  findUserByEmail,
  findUserById,
  getUsers,
  restoreUser,
  updateMe,
  updateUser,
} from '../services/user.service';
import { CustomRequests, ExtendedUser } from '../types';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';
import { createPaginationPrisma } from '../utils/createPagination';
import { db } from '../db';

/** @description returns all users from db
 *  @example   res.status(200).json({
    status: 'success',
    results: users.length,
    totalResults: total,
    data: { users },
  });
 */
export const getAllUsersHandler = catchAsync(
  async (req: Request<object, object, object, GetAllUsersInput>, res: Response, next: NextFunction) => {
    const { index: clientIndex, limit: ClientLimit, email } = req.query;
    const { limit, startIndex, total } = await createPaginationPrisma(clientIndex, ClientLimit, db.user);

    const users = await getUsers(startIndex, limit, email);
    res.status(200).json({
      status: 'success',
      results: users.length,
      totalResults: total,
      data: { users },
    });
  },
);

/** @description finds & returns user by id  from db
 *  @example   res.status(200).json({
    status: 'success',
    data: { user },
  });
 */
export const getUserHandler = catchAsync(async (req: Request<GetUserSchema>, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new AppError('Please enter an id', 404));
  }
  const user = await findUserById(id);

  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user?.id,
        email: user?.email,
        verified: user?.verified,
        createdAt: user?.createdAt,
        role: user?.role,

        profile: {
          firstName: user?.profile?.firstName,
          lastName: user?.profile?.lastName,
          phoneNumber: user?.profile?.phoneNumber,
          gender: user?.profile?.gender,
        },
        address: {
          city: user?.address?.city,
          state: user?.address?.state,
          zipCode: user?.address?.zipCode,
          street: user?.address?.street,
        },
        order: user?.order,
      },
    },
  });
});

/**@description update user data without password and returns updated user */
export const updateMeHandler = catchAsync(
  async (req: CustomRequests<object, UpdateMeInput>, res: Response, next: NextFunction) => {
    const { id } = req.user;
    const { phoneNumber, city, state, street, zipCode, email, firstName, lastName, gender } = req.body;

    if (!phoneNumber && !city && state && street && zipCode && !email && !firstName && !lastName && !gender) {
      return next(new AppError('There is no data to update', 400));
    }

    const updatedUser = await updateMe(id, {
      phoneNumber,
      city,
      state,
      street,
      zipCode,
      email,
      firstName,
      lastName,
      gender,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: {
          ...updatedUser,
        },
      },
    });
  },
);

/** @description makes admin update user data */
export const updateUserHandler = catchAsync(
  async (req: Request<object, object, UpdateUserInput>, res: Response, next: NextFunction) => {
    const { email, firstName, gender, lastName, phoneNumber, role, verified, active, city, state, street, zipCode } =
      req.body;

    if (!phoneNumber && !email && !firstName && !lastName && !gender && role && verified) {
      return next(new AppError('There is no data to update', 400));
    }

    const updatedUser = await updateUser(email, {
      email,
      firstName,
      gender,
      lastName,
      phoneNumber,
      role,
      verified,
      active,
      city,
      state,
      street,
      zipCode,
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          ...updatedUser,
        },
      },
    });
  },
);

/** @description delete user by id  (make active false in db)*/
export const deleteMeHandler = catchAsync(async (req: CustomRequests, res: Response, next: NextFunction) => {
  const { id } = req.user;
  const isDeleted = await deleteMe(id as string);
  if (!isDeleted) {
    return next(new AppError('Can not delete user right now. Please try again later', 500));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

export const deleteUserHandler = catchAsync(
  async (req: Request<object, object, DeleteUserInput>, res: Response, next: NextFunction) => {
    const { email } = req.body;

    const checkUser = await findUserByEmail(email);

    if (!checkUser) {
      return next(new AppError('User Not found or already deleted', 404));
    }

    await deleteUser(email);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);

/** @description reactivate deleted users  */
export const restoreUserHandler = catchAsync(
  async (req: Request<object, object, RestoreUserInput>, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const isRestored = await restoreUser(email);

    if (!isRestored) {
      return next(new AppError('Can not restore user right now. Please try again later', 500));
    }

    res.status(200).json({
      status: 'success',
      message: 'user restored successfully',
    });
  },
);

/** @description returns user info  */
export const getMeHandler = catchAsync(async (req: CustomRequests, res: Response, next: NextFunction) => {
  const user: ExtendedUser = req.user;
  res.status(200).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        email: user.email,
        firstName: user.profile.firstName,
        lastName: user.profile.lastName,
        phoneNumber: user.profile.phoneNumber,
        gender: user.profile.gender,
        createdAt: user.createdAt,
        verified: user.verified,
      },
    },
  });
});
