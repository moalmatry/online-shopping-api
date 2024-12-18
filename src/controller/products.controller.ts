/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { CreateProductInput, DeleteProductInput, ProductById, UpdateProductInput } from '../schema/products.schema';
import {
  createNewProduct,
  deleteProduct,
  findProductById,
  getAllProducts,
  updateProduct,
} from '../services/products.service';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/AppError';

/** @description return all products */
export const getAllProductsHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const products = await getAllProducts();

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
});

export const getProductByIdHandler = catchAsync(
  async (req: Request<ProductById>, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const product = await findProductById(id);
    if (!product) {
      return next(new AppError('Please enter valid id', 404));
    }
    res.status(200).json({
      status: 'success',
      data: { product },
    });
  },
);

/** @description create new product */
export const createNewProductHandler = catchAsync(
  async (req: Request<object, object, CreateProductInput>, res: Response, next: NextFunction) => {
    const { categoryName, description, name, variants, tags } = req.body;

    const product = await createNewProduct({
      categoryName,
      description,
      name,
      tags: tags ?? [],
      variants: variants ?? [],
    });

    res.status(200).json({
      status: 'success',
      data: { product },
    });
  },
);

/** @description update product */
export const updateProductHandler = catchAsync(
  async (req: Request<object, object, UpdateProductInput>, res: Response, next: NextFunction) => {
    const { id, categoryName, description, name, tags } = req.body;

    const updatedProduct = await updateProduct({
      id,
      name,
      description,
      categoryName,
      tags,
    });

    res.status(200).json({
      status: 'success',
      data: { product: updatedProduct },
    });
  },
);

/** @description delete product */
export const deleteProductHandler = catchAsync(
  async (req: Request<object, object, DeleteProductInput>, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const deletedProduct = await deleteProduct(id);

    res.status(200).json({
      status: 'success',
      data: { product: deletedProduct },
    });
  },
);
