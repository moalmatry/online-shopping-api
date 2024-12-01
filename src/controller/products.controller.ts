/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import {
  CreateProductInput,
  DeleteProductInput,
  ProductByNameInput,
  UpdateProductInput,
} from '../schema/products.schema';
import {
  createNewProduct,
  deleteProduct,
  findProductByName,
  getAllProducts,
  updateProduct,
} from '../services/products.service';

/** @description return all products */
export const getAllProductsHandler = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const products = await getAllProducts();

  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products },
  });
});

export const findProductByNameHandler = catchAsync(
  async (req: Request<ProductByNameInput>, res: Response, next: NextFunction) => {
    const { name } = req.params;

    const products = await findProductByName(name);

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products },
    });
  },
);

/** @description create new product */
export const createNewProductHandler = catchAsync(
  async (req: Request<object, object, CreateProductInput>, res: Response, next: NextFunction) => {
    const { categoryName, description, name, price, images, tags } = req.body;

    const product = await createNewProduct({
      categoryName,
      description,
      name,
      price,
      images,
      tags,
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
    const { categoryName, description, id, name, price, images, tags } = req.body;

    const updatedProduct = await updateProduct({
      id,
      categoryName,
      description,
      name,
      price,
      images,
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
