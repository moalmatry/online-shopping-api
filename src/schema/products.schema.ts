import { z } from 'zod';

export const createProductSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Product name is required' }).min(5, 'Product name must be at least 5 characters'),
    description: z
      .string({ required_error: 'Product description is required' })
      .min(5, 'Product description must be at least 5 characters'),
    tags: z.array(z.string()).optional(),

    categoryName: z
      .string({ required_error: 'Product category name is required' })
      .min(5, 'Product category must be at least 5 characters'),
    variants: z.array(
      z.object({
        name: z
          .string({ required_error: 'Product variant name is required' })
          .min(5, 'Variant name must be at least 5 characters'),
        price: z
          .number({ required_error: 'Product variant price is required' })
          .min(1, 'Product variant price must be at least 1'),
        images: z.array(z.string()),
        description: z
          .string({ required_error: 'Product variant name is required' })
          .min(5, 'Product variant description must be at least 5 characters'),
        available: z.boolean(),
        quantity: z
          .number({ required_error: 'Product variant quantity' })
          .min(1, 'Product variant quantity must be at least 1'),
      }),
    ),
  }),
});

export const updateProductSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Product Id is required' }).min(1, 'Id should be at least character'),
    name: z
      .string({ required_error: 'Product name is required' })
      .min(5, 'Product name must be at least 5 characters')
      .optional(),
    description: z
      .string({ required_error: 'Product description is required' })
      .min(5, 'Product description must be at least 5 characters')
      .optional(),
    tags: z.array(z.string()).optional(),
    categoryName: z
      .string({ required_error: 'Product category is required' })
      .min(5, 'Product category must be at least 5 characters')
      .optional(),
  }),
});

// variants: z
//   .object({
//     id: z.string({ required_error: 'Variant Id is required' }).min(1, 'Variant should be at least character'),
//     name: z
//       .string({ required_error: 'Product name is required' })
//       .min(5, 'Variant name must be at least 5 characters')
//       .optional(),
//     price: z
//       .number({ required_error: 'Product variant price is required' })
//       .min(1, 'Product variant price must be at least 1')
//       .optional(),
//     images: z.array(z.string()).optional(),
//     description: z
//       .string({ required_error: 'Product variant name is required' })
//       .min(5, 'Product variant description must be at least 5 characters')
//       .optional(),
//     available: z.boolean().optional(),
//     quantity: z
//       .number({ required_error: 'Product variant quantity' })
//       .min(1, 'Product variant quantity must be at least 1')
//       .optional(),
//   })

export const deleteProductSchema = z.object({
  body: z.object({
    id: z.string({ required_error: 'Product Id is required' }).min(1, 'Id should be at least character'),
  }),
});

export const productById = z.object({
  params: z.object({
    id: z.string({ required_error: 'Please enter category product id' }),
  }),
});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>['body'];
export type UpdateProductInput = z.TypeOf<typeof updateProductSchema>['body'];
export type DeleteProductInput = z.TypeOf<typeof deleteProductSchema>['body'];
export type ProductById = z.TypeOf<typeof productById>['params'];
