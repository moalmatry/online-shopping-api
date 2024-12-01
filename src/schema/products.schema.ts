import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Product name is required' }).min(5, 'Product name must be at least 5 characters'),
    price: z.number({ required_error: 'Product price is required' }).min(1, 'Product price must be at least 1'),
    description: z
      .string({ required_error: 'Product description is required' })
      .min(5, 'Product description must be at least 5 characters'),
    categoryName: z
      .string({ required_error: 'Product category name is required' })
      .min(5, 'Product category must be at least 5 characters'),
    images: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Product Id is required' }).min(1, 'Id should be at least character'),
    name: z.string({ required_error: 'Product name is required' }).min(5, 'Product name must be at least 5 characters'),
    price: z.number({ required_error: 'Product price is required' }).min(1, 'Product price must be at least 1'),
    description: z
      .string({ required_error: 'Product description is required' })
      .min(5, 'Product description must be at least 5 characters'),
    categoryName: z
      .string({ required_error: 'Product category is required' })
      .min(5, 'Product category must be at least 5 characters'),
    images: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const deleteProductSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Product Id is required' }).min(1, 'Id should be at least character'),
  }),
});

export const productByNameSchema = z.object({
  params: z.object({
    name: z.string({ required_error: 'Please enter category name' }),
  }),
});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>['body'];
export type UpdateProductInput = z.TypeOf<typeof updateProductSchema>['body'];
export type DeleteProductInput = z.TypeOf<typeof deleteProductSchema>['body'];
export type ProductByNameInput = z.TypeOf<typeof productByNameSchema>['params'];
