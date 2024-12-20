/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import {
  CategoryByIdInput,
  CreateCategoryInput,
  DeleteCategoryInput,
  UpdateCategoryInput,
} from '../schema/categories.schema';
import {
  createCategory,
  deleteCategory,
  findCategoryById,
  getCategories,
  updateCategory,
} from '../services/categories.service';
import AppError from '../utils/AppError';
import catchAsync from '../utils/catchAsync';

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

export const getCategoryByIdHandler = catchAsync(async (req: Request<CategoryByIdInput>, res, next) => {
  const { id } = req.params;

  const category = await findCategoryById(id);

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
    const { name, id, image } = req.body;

    const updatedCategory = await updateCategory(id, name, image);

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
    const { id } = req.body;

    const deletedCategory = await deleteCategory(id);

    if (!deletedCategory) {
      return next(new AppError('Category not fount please make sure that is exists', 400));
    }

    res.status(204).json({
      status: 'success',
      data: { category: deletedCategory },
    });
  },
);
