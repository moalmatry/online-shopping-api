/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import {
  createCategory,
  deleteCategory,
  findCategoryByName,
  getCategories,
  updateCategory,
} from '../services/categories.service';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';
import {
  CategoryByNameInput,
  CreateCategoryInput,
  DeleteCategoryInput,
  UpdateCategoryInput,
} from '../schema/categories.schema';

/**@description get all categories */
export const getAllCategoriesHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const categories = await getCategories(false);
  if (!categories) {
    return next(new AppError('Something went wong please try again later', 500));
  }

  res.status(200).json({
    status: 'success',
    results: categories.length,
    data: { categories },
  });
});

export const getCategoryByNameHandler = catchAsync(async (req: Request<CategoryByNameInput>, res, next) => {
  const { name } = req.params;
  const category = await findCategoryByName(name);

  if (!category) {
    return next(new AppError('Category not found', 404));
  }
  res.status(200).json({
    status: 'success',
    data: { category },
  });
});

/**@description create new category */
export const createCategoryHandler = catchAsync(
  async (req: Request<object, object, CreateCategoryInput>, res, next) => {
    const { name } = req.body;
    const category = await createCategory(name);

    res.status(200).json({
      status: 'success',
      data: { category },
    });
  },
);

/**@description update existing category */
export const updateCategoryHandler = catchAsync(
  async (req: Request<object, object, UpdateCategoryInput>, res: Response, next: NextFunction) => {
    const { name, newName } = req.body;

    const updatedCategory = await updateCategory(name, newName);

    if (!updatedCategory) {
      return next(new AppError('Category not fount please make sure that is exists', 400));
    }

    res.status(200).json({
      status: 'success',
      data: { category: updatedCategory },
    });
  },
);

/**@description delete existing category */
export const deleteCategoryHandler = catchAsync(
  async (req: Request<object, object, DeleteCategoryInput>, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const deletedCategory = await deleteCategory(name);

    if (!deletedCategory) {
      return next(new AppError('Category not fount please make sure that is exists', 400));
    }

    res.status(201).json({
      status: 'success',
      data: { category: deletedCategory },
    });
  },
);
