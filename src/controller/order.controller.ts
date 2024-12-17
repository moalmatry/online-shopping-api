/* eslint-disable @typescript-eslint/ban-ts-comment */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { Role } from '@prisma/client/default';
import { getUserOrders } from '../services/orders.service';

export const getAllOrdersHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // @ts-expect-error
  const userRule = req.user.role as Role;
  // @ts-expect-error
  const id = req.user.id as string;

  if (userRule === 'ADMIN' || userRule === 'EMPLOYEE') {
    console.log(userRule);
  } else if (userRule === 'USER') {
    const uerOrders = getUserOrders();
    console.log(userRule);
  }
  res.status(200).json({
    status: 'success',
    results: 20,
    data: { orders: [] },
  });
});

export const getOrderByIdHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    data: { order: {} },
  });
});

export const createOrderHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    data: { order: {} },
  });
});

export const deleteOrderHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(201).json({
    status: 'success',
  });
});

export const updateOrderHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: 'success',
    data: { order: {} },
  });
});
